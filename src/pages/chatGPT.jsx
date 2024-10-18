import React, { useState } from 'react';
import axios from 'axios';
import logoChat from '../../public/assets/avatar_aura_chat.png'
import '../styles/chat_gpt.css';
import '../styles/dashboard.css';
import Sidebar from '../components/sidebar';
import CardUser from '../components/card_user';
import { jwtDecode } from 'jwt-decode';



const localURL = 'http://localhost:3000'
const ChatGPT = () => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;



  
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Descubra seu Hiperfoco' }
  ]);
  

  const sendMessage = async () => {
    if (!message.trim()) return; 
  

    const userMessage = { role: 'user', content: message };
    const conversationHistory = [...chatHistory, userMessage]; 
  
    setChatHistory(conversationHistory); 
  
    try {
      console.log("TOKEN DO CHAT", token);
      
     
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/aura/chat`,
        { 
          studentId:userId,
          userMessage: message, 
          conversationHistory   
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        }
      );
  
      
      const assistantMessage = { role: 'assistant', content: response.data.message };
      setChatHistory((prev) => [...prev, assistantMessage]);
      setMessage(''); 
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = { role: 'assistant', content: 'Erro ao obter resposta do servidor' };
      setChatHistory((prev) => [...prev, errorMessage]);
    }
  
    
  };
  

  return (
    <div className="chat-container">
      <div className="header_information_chat">
                <Sidebar/>
                <CardUser/>
            </div>

      <div className="chat-header">
        <img src={logoChat} alt="Aura" className="logo" />
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
};

export default ChatGPT;
