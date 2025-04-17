// // src/components/ChatWindow.jsx
// import { useState } from "react";
// import Message from "./Message";
// import { sendMessage } from "../services/api";
// import "./ChatWindow.css";

// export default function ChatWindow() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]); // Ensure state updates correctly
//     setInput("");

//     try {
//       const response = await sendMessage(input);
//       const botMessage = { sender: "bot", text: response };

//       setMessages((prevMessages) => [...prevMessages, botMessage]); // Append bot response
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <Message key={index} sender={msg.sender} text={msg.text} />
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Talk to a historical figure..."
//         />
//         <button className="send-button" onClick={handleSend}>
//           <svg viewBox="0 0 24 24">
//             <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { sendMessage } from "../services/api";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await sendMessage(input);
      const botMessage = { 
        sender: "bot", 
        text: response, 
        timestamp: new Date() 
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev, 
        { 
          sender: "bot", 
          text: "Sorry, I'm having trouble responding.", 
          timestamp: new Date() 
        }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message
            key={`${msg.timestamp}-${index}`}
            text={msg.text}
            isUser={msg.sender === "user"}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          aria-label="Type your message"
        />
        <button 
          className="send-button" 
          onClick={handleSend}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}