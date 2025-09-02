import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello 👋! I’m your EduConnect AI assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Dummy AI Response (replace later with API call)
    const botMessage: Message = {
      sender: "bot",
      text: `🤖 I think you asked about "${input}". Here's a helpful explanation (dummy).`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
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
          className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
