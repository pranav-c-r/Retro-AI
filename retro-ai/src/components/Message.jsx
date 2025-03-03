// src/components/Message.jsx

export default function Message({ sender, text }) {
    return (
      <div className={`p-2 my-1 rounded-lg ${sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
        <p>{text}</p>
      </div>
    );
  }