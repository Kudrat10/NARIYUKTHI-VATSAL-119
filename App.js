import React, { useState } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("input_text", inputText);
    formData.append("target_language", language);

    const res = await fetch("http://localhost:8000/chat/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResponse(data.translated_response);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Multilingual Chatbot</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your question here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh-cn">Chinese (Simplified)</option>
        <option value="hi">Hindi</option>
        <option value="ar">Arabic</option>
        <option value="ru">Russian</option>
        <option value="ja">Japanese</option>
        <option value="pt">Portuguese</option>
      </select>
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Get Answer
      </button>
      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
};

export default App;
