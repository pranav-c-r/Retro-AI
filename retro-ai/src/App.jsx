// src/App.jsx
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

export default function App() {
  return (
    <div className="chat-container">
      <ChatWindow />
    </div>
  );
}
