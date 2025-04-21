import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Welcome to Tamil Nadu Heritage Navigator! How can I help you explore our rich cultural heritage today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: input
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            const botMessage = {
                type: 'bot',
                content: 'This is a simulated response. Connect to your backend API to get real responses.'
            };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="chatbot">
            <div className="chatbot-container">
                <div className="chat-header">
                    <h1>Tamil Nadu Heritage Chatbot</h1>
                    <p>Ask me anything about Tamil Nadu's heritage sites, culture, and history</p>
                </div>

                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message bot">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="send-button"
                    >
                        <i className="fas fa-paper-plane"></i>
                        <span className="send-text">Send</span>
                    </button>
                </form>
            </div>

            <div className="chat-suggestions">
                <h3>Suggested Questions</h3>
                <div className="suggestion-buttons">
                    <button onClick={() => setInput("Tell me about the Meenakshi Temple")}>
                        Tell me about the Meenakshi Temple
                    </button>
                    <button onClick={() => setInput("What are the UNESCO World Heritage sites in Tamil Nadu?")}>
                        UNESCO World Heritage sites
                    </button>
                    <button onClick={() => setInput("Explain Tamil Nadu's classical dance forms")}>
                        Classical dance forms
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
