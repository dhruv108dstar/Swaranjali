import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const ChatInterface = ({ mood }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: `Hi there! I noticed you are feeling ${mood}. I'm Sahara AI, your confidential space to talk freely. How can I support you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMsg,
        history: messages
      });

      setMessages([...newMessages, { role: 'model', text: response.data.response }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages, 
        { 
          role: 'model', 
          text: "I'm having a little trouble connecting right now, but please know you are not alone. Take a deep breath." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message-bubble message-ai" style={{ width: 'fit-content' }}>
            <div className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          className="chat-input"
          placeholder="Type your message here... I am listening." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={!input.trim() || isLoading}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
