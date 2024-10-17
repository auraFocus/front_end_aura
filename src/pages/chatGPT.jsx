import React, { useState } from 'react';
import axios from 'axios';
import './chat_gpt.css';

const ChatGPT = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Descubra seu Hiperfoco' }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return; 

    const userMessage = { role: 'user', content: message };
    setChatHistory((prev) => [...prev, userMessage]); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { message }); 
      const assistantMessage = { role: 'assistant', content: response.data.message };
      setChatHistory((prev) => [...prev, assistantMessage]); 
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = { role: 'assistant', content: 'Erro ao obter resposta do servidor' };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setMessage(''); 
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/path-to-your-logo.png" alt="Aura" className="logo" />
        <h1>Aura</h1>
      </div>

      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={chat.role === 'user' ? 'user-message' : 'assistant-message'}
          >
            {chat.content}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Mensagem para a Aura"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Envia ao pressionar Enter
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
};

export default ChatGPT;
