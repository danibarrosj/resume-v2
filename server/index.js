import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';

const app = express();

// CORS – lock to your frontends
const origins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ----- Nodemailer transporter -----
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,             // e.g. smtp.zoho.com
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false') === 'true', // true for 465
  auth: {
    user: process.env.SMTP_USER,           // required
    pass: process.env.SMTP_PASS,           // required
  },
});

// Optional: verify on boot to see clear errors
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP verify failed:', err);
  } else {
    console.log('✅ SMTP ready');
  }
});

// Optional: site-specific system prompt (unchanged)
const SYSTEM_PROMPT = `You are the assistant on Daniel J. Barros' portfolio (CyberCloudVet).
Answer concisely and professionally about his skills, projects, education,
certifications (CompTIA Network+, Security+, CySA+), and how to get in touch.
If asked for private or unknown info, politely decline.`;

// Trim chat history
const clamp = (msgs, n = 12) => msgs.slice(-n);

// AI chat endpoint (unchanged)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    const full = [{ role: 'system', content: SYSTEM_PROMPT }, ...clamp(messages)];
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: full,
      temperature: 0.4
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message, hp } = req.body || {};

  // Simple honeypot check (hp should be empty)
  if (hp && String(hp).trim() !== '') return res.status(200).json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Send email to you
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // deliver to your inbox
      subject: `New contact form: ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br/>')}</p>`
    });

    // (Optional) Auto-acknowledge to the sender
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM || process.env.SMTP_USER,
    //   to: email,
    //   subject: `Thanks for reaching out, ${name}!`,
    //   text: `Hi ${name},\n\nThanks for your message — I'll get back to you soon.\n\n— Daniel`,
    // });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`);
});
