// src/components/AIAssistant.jsx
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Use OpenAI-style roles so we can send the whole chat history to the server
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 How can I help you explore this website?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787";
  const listRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Your server expects { messages: [{role, content}, ...] }
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.reply?.trim() || "Sorry, I couldn’t get a response right now.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hmm, I couldn’t reach the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-50"
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-80 bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-primary/10 p-3 font-semibold text-center text-primary">
              AI Assistant 🤖
            </div>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-3 space-y-3 text-sm bg-background/40"
            >
              {messages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-wrap ${
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl bg-secondary text-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span>Thinking</span>
                      <span className="inline-flex gap-1">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse [animation-delay:120ms]">.</span>
                        <span className="animate-pulse [animation-delay:240ms]">.</span>
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex border-t border-border">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something about Daniel..."
                className="flex-1 p-2 text-sm bg-background outline-none"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="p-2 text-primary hover:bg-secondary/50 transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
