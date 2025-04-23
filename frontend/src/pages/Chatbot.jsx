import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([
        { type: 'bot', content: 'Welcome to Tamil Nadu Heritage Navigator! How can I help you explore our rich cultural heritage today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const playAudio = (url) => {
        const audio = new Audio(url);
        audio.play();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { type: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const response = await fetch('http://localhost:8000/ask/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ prompt: input })
        });

        const data = await response.json();
        const botMessage = { type: 'bot', content: data.answer };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        playAudio(`http://localhost:8000${data.audio_url}`);
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = e => {
            audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioBlob);
            formData.append('lang', 'en'); // or 'ta' for Tamil

            setIsLoading(true);
            const response = await fetch('http://localhost:8000/voice-query/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { type: 'user', content: data.transcription },
                { type: 'bot', content: data.answer }
            ]);
            setIsLoading(false);
            playAudio(`http://localhost:8000${data.audio_url}`);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    return (
        <div className="chatbot">
            <div className="chatbot-container">
                <div className="chat-header">
                    <h1>Tamil Nadu Heritage Chatbot</h1>
                    <p>Ask me anything about Tamil Nadu's heritage sites, culture, and history</p>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.type}`}>
                            <div className="message-content">{msg.content}</div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message bot">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
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
                    <button type="submit" className="send-button" disabled={isLoading}>
                        Send
                    </button>
                    <button
                        type="button"
                        className="mic-button"
                        onClick={recording ? stopRecording : startRecording}
                        style={{ backgroundColor: recording ? '#f44336' : '#4CAF50' }}
                    >
                        🎤
                    </button>
                </form>
            </div>

            <div className="chat-suggestions">
                <h3>Suggested Questions</h3>
                <div className="suggestion-buttons">
                    <button onClick={() => setInput("Tell me about the Meenakshi Temple")}>
                        Meenakshi Temple
                    </button>
                    <button onClick={() => setInput("What are the UNESCO World Heritage sites in Tamil Nadu?")}>
                        UNESCO Sites
                    </button>
                    <button onClick={() => setInput("Explain Tamil Nadu's classical dance forms")}>
                        Classical Dances
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
