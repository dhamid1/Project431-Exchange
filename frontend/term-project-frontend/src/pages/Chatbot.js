 
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import './chatbot.css';


const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  };

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const sendMessage = (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);
    axios.post(url, data, { headers: headers })
      .then((response) => {
        setIsLoading(false);
        displayBotMessage(response.data.choices[0].message.content);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const displayBotMessage = (message) => {
    const words = message.split(' ');
  
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'bot', message: words.join(' ') },
    ]);
  
    words.forEach((word, index) => {
      setTimeout(() => {
        setChatLog((prevChatLog) => {
          const updatedChatLog = [...prevChatLog];
          updatedChatLog[prevChatLog.length - 1].message = words
            .slice(0, index + 1)
            .join(' ');
          return updatedChatLog;
        });
  
        
        if (index === words.length - 1) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      }, (index + 1) * 100); 
    });
  };
  
  
  

  
  useEffect(() => {
    chatLogRef.current.scrollTo(0, chatLogRef.current.scrollHeight);
  }, [chatLog]);

  return (
    <div className="chatbot-container">
      <div className="ask-ai-label">Ask dAIwood</div>
      <div className="chat-log" ref={chatLogRef}>
        {chatLog.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.message}
          </div>
        ))}
        {isLoading && <div className="message bot typing">Typing...</div>}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input type="text" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
