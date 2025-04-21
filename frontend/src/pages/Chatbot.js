import React, { useState, useEffect, useRef } from 'react';
import LanguageToggle from '../components/LanguageToggle';
import '../App.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [language, setLanguage] = useState('english');
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { text: inputMessage, sender: 'user', language };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputMessage, language })
            });
            
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.response, sender: 'bot', language }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { text: "Sorry, I encountered an error.", sender: 'bot', language }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>Tamil Nadu Heritage Chatbot</h2>
                <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>
            
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'english' ? "Type your message..." : "உங்கள் செய்தியை தட்டச்சு செய்க..."}
                />
                <button onClick={handleSendMessage}>
                    {language === 'english' ? "Send" : "அனுப்பு"}
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
