import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("dialogflowSessionId") || uuidv4();
    localStorage.setItem("dialogflowSessionId", session);
    setSessionId(session);

    addBotMessage("Hi! How can I assist you today?");
  }, []);

  const addBotMessage = (content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", content },
    ]);
  };

  const addUserMessage = (content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    addUserMessage(input);

    try {
      const response = await axios.post(
        `https://dialogflow.googleapis.com/v2/projects/inventorybot-buru/locations/global/agent/sessions/${sessionId}:detectIntent`,
        {
          queryInput: {
            text: {
              text: input,
              languageCode: "en",
            },
          },
        }
      );

      const botReply = response.data.queryResult.fulfillmentText;
      addBotMessage(botReply);
    } catch (error) {
      addBotMessage("Oops! Something went wrong. Please try again later.");
      console.error(error);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                width: "100lvh",
                backgroundColor: msg.sender === "bot" ? "#f1f0f0" : "#007bff",
                color: msg.sender === "bot" ? "#000" : "#fff",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: "10px", margin: "10px 0" }}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
