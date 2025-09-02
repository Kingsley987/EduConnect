import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const genAI = new GoogleGenerativeAI("AIzaSyDpubizana4s0kFIal2M9e5Ib9stdMSM5A");

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello 👋! I’m your EduConnect AI assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = result.response.text();

      const botMessage: Message = { sender: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t get a response. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-lg font-bold mb-2">💬 EduConnect AI Chatbot</h1>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-800 rounded-lg">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === "user"
                ? "bg-emerald-600 self-end text-white"
                : "bg-gray-700 text-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">🤖 Thinking...</div>}
      </div>

      {/* Input Box */}
      <div className="flex mt-3 gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
