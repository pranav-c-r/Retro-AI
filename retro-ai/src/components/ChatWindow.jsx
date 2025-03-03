// src/components/ChatWindow.jsx
import { useState } from "react";
import Message from "./Message";
import { sendMessage } from "../services/api";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Ensure state updates correctly
    setInput("");

    try {
      const response = await sendMessage(input);
      const botMessage = { sender: "bot", text: response };

      setMessages((prevMessages) => [...prevMessages, botMessage]); // Append bot response
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to a historical figure..."
        />
        <button className="send-button" onClick={handleSend}>
          <svg viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
