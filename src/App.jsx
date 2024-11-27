import React from "react";
import "react-chatbot-kit/build/main.css";

import "./App.css";
import Chatbot from "./components/chatbot.jsx";

const App = () => {
  return (
    <div className="app bg-secondary text-white vh-100 py-3">
      <h2> Inventory Chatbot</h2>
      <div className="container d-flex align-items-center justify-content-center py-4">
        <Chatbot />
      </div>
    </div>
  );
};

export default App;
