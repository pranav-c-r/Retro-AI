// // src/components/Message.jsx

// export default function Message({ sender, text }) {
//     return (
//       <div className={`p-2 my-1 rounded-lg ${sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
//         <p>{text}</p>
//       </div>
//     );
//   }

import "./Message.css";

export default function Message({ sender, text, isUser }) {
  return (
    <div className={`message ${isUser ? "user-message" : "bot-message"}`}>
      <div className="message-content">{text}</div>
    </div>
  );
}