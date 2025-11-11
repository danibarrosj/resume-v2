// server/scripts/index-files.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { globSync } from "glob";
import OpenAI from "openai";
import "dotenv/config";

// ----- Resolve paths relative to THIS file -----
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// __dirname = .../server/scripts   →   ROOT = .../server
const ROOT = path.resolve(__dirname, "..");

// Allow override via env, else default to folders inside /server
const KNOWLEDGE_DIR = process.env.KNOWLEDGE_DIR
  ? path.resolve(process.env.KNOWLEDGE_DIR)
  : path.join(ROOT, "knowledge");

const OUT = process.env.EMBEDDINGS_OUT
  ? path.resolve(process.env.EMBEDDINGS_OUT)
  : path.join(ROOT, "data", "embeddings.json");

// ----- pdf-parse (CJS) -----
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

// ----- OpenAI -----
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------- memory-safe config ----------
const MAX_FILE_BYTES   = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_CHUNKS = 20000;           // safety ceiling
const CHARS_PER_CHUNK  = 1000;            // smaller chunk
const OVERLAP          = 150;             // modest overlap
const EMBED_BATCH_SIZE = 32;              // small batches

function chunkText(text, maxChars = CHARS_PER_CHUNK, overlap = OVERLAP) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + maxChars, text.length);
    out.push(text.slice(i, end));
    i = Math.max(0, end - overlap);
    if (i >= text.length) break;
    if (out.length > MAX_TOTAL_CHUNKS) {
      console.warn("⚠️  Reached MAX_TOTAL_CHUNKS; stopping further chunking.");
      break;
    }
  }
  return out.map(t => t.trim()).filter(Boolean);
}

async function fileToText(file) {
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(file);
  if (ext === ".pdf") {
    const { text } = await pdf(buf);
    return text;
  }
  // .txt / .md (default)
  return buf.toString("utf8");
}

async function embedBatch(texts) {
  if (!texts.length) return [];
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });
  return res.data.map(d => d.embedding);
}

// ---- stream JSON to disk so we don't keep everything in RAM ----
function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}
function startJsonArray(fp) {
  ensureDir(fp);
  fs.writeFileSync(fp, '{"rows":[\n');
}
function appendJsonRow(fp, row, isFirst) {
  const prefix = isFirst ? "" : ",\n";
  fs.appendFileSync(fp, prefix + JSON.stringify(row));
}
function endJsonArray(fp) {
  fs.appendFileSync(fp, '\n]}');
}

// ---- main ----
(async () => {
  console.log("🔧 Working from:", ROOT);
  console.log("📂 Knowledge dir:", KNOWLEDGE_DIR);
  console.log("📝 Output file:", OUT);

  const pattern = `${KNOWLEDGE_DIR.replace(/\\/g, "/")}/**/*.{md,txt,pdf}`;
  console.log("🔎 Scanning pattern:", pattern);

  const files = globSync(pattern, { nodir: true, windowsPathsNoEscape: true });

  if (!files.length) {
    try { console.log("📄 Dir entries:", fs.readdirSync(KNOWLEDGE_DIR)); } catch {}
    console.log("⚠️  No files found in", KNOWLEDGE_DIR);
    process.exit(0);
  }

  startJsonArray(OUT);
  let rowCount = 0;

  for (const file of files) {
    try {
      const stat = fs.statSync(file);
      if (stat.size > MAX_FILE_BYTES) {
        console.warn(`⚠️  Skipping ${file} (${(stat.size/1e6).toFixed(1)} MB > ${(MAX_FILE_BYTES/1e6)} MB)`);
        continue;
      }

      console.log("🧠 Indexing:", file);
      const txt = (await fileToText(file)).replace(/\s+/g, " ").trim();
      if (!txt) continue;

      const chunks = chunkText(txt);
      if (!chunks.length) continue;

      // embed in batches and stream rows
      for (let i = 0; i < chunks.length; i += EMBED_BATCH_SIZE) {
        const slice = chunks.slice(i, i + EMBED_BATCH_SIZE);
        const embeddings = await embedBatch(slice);

        for (let j = 0; j < slice.length; j++) {
          const row = {
            id: `${path.basename(file)}::${i + j}`,
            file: path.basename(file),
            content: slice[j],
            embedding: embeddings[j],
          };
          appendJsonRow(OUT, row, rowCount === 0);
          rowCount++;

          if (rowCount >= MAX_TOTAL_CHUNKS) {
            console.warn("⚠️  Reached MAX_TOTAL_CHUNKS; stopping indexing.");
            endJsonArray(OUT);
            console.log(`✅ Wrote ${rowCount} chunks → ${OUT}`);
            process.exit(0);
          }
        }
      }
    } catch (err) {
      console.warn(`⚠️  Failed indexing ${file}:`, err.message ?? err);
    }
  }

  endJsonArray(OUT);
  console.log(`✅ Wrote ${rowCount} chunks → ${OUT}`);
})().catch(err => {
  console.error("❌ Indexing failed:", err?.response?.data ?? err);
  process.exit(1);
});
