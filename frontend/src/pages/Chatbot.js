import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { FaMicrophone, FaStop, FaLanguage } from 'react-icons/fa';

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Welcome to Tamil Nadu Heritage Navigator! How can I help you explore our rich cultural heritage today?',
            language: 'en'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'ta'
    const messagesEndRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ta' : 'en');
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // Convert blob to base64
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64Audio = reader.result.split(',')[1];
                    handleAudioSubmit(base64Audio);
                };
            };
            
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error starting recording:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleAudioSubmit = async (audioData) => {
        setIsLoading(true);
        
        try {
            // Add a temporary user message
            setMessages(prev => [...prev, {
                type: 'user',
                content: '🎤 Voice message...',
                language
            }]);
            
            // Send to backend for processing
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audio: audioData,
                    language
                }),
            });
            
            const data = await response.json();
            
            // Update with the actual transcription and response
            setMessages(prev => {
                const newMessages = [...prev];
                // Replace the last temporary message with the actual transcription
                newMessages[newMessages.length - 1].content = data.text;
                return newMessages;
            });
            
            // Play audio response if available
            if (data.audio) {
                const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
                audio.play();
            }
        } catch (error) {
            console.error('Error processing audio:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, I encountered an error processing your voice message.',
                language
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: input,
            language
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send to backend
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: input,
                    language
                }),
            });
            
            const data = await response.json();
            
            // Add bot response
            setMessages(prev => [...prev, {
                type: 'bot',
                content: data.text,
                language
            }]);
            
            // Play audio response if available
            if (data.audio) {
                const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
                audio.play();
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, I encountered an error processing your request.',
                language
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };

    return (
        <div className="chatbot">
            <div className="chatbot-container">
                <div className="chat-header">
                    <h1>Tamil Nadu Heritage Chatbot</h1>
                    <p>Ask me anything about Tamil Nadu's heritage sites, culture, and history</p>
                    <div className="language-toggle">
                        <button onClick={toggleLanguage}>
                            <FaLanguage />
                            {language === 'en' ? 'தமிழ்' : 'English'}
                        </button>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-content">
                                {message.content}
                                {message.type === 'bot' && (
                                    <button 
                                        className="play-audio-btn"
                                        onClick={() => {
                                            // Trigger audio playback for this message
                                            // This would require storing audio with each message
                                            // or regenerating it on demand
                                        }}
                                        title="Play audio"
                                    >
                                        🔊
                                    </button>
                                )}
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
                        placeholder={language === 'en' ? "Type your message here..." : "உங்கள் செய்தியை இங்கே தட்டச்சு செய்க..."}
                        disabled={isLoading || isRecording}
                    />
                    <div className="input-buttons">
                        <button 
                            type="button" 
                            className={`mic-button ${isRecording ? 'recording' : ''}`}
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isLoading}
                        >
                            {isRecording ? <FaStop /> : <FaMicrophone />}
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading || isRecording}
                            className="send-button"
                        >
                            {language === 'en' ? 'Send' : 'அனுப்பு'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="chat-suggestions">
                <h3>{language === 'en' ? 'Suggested Questions' : 'பரிந்துரைக்கப்பட்ட கேள்விகள்'}</h3>
                <div className="suggestion-buttons">
                    <button onClick={() => handleSuggestionClick(language === 'en' ? "Tell me about the Meenakshi Temple" : "மீனாட்சி கோவில் பற்றி சொல்லுங்கள்")}>
                        {language === 'en' ? "Meenakshi Temple" : "மீனாட்சி கோவில்"}
                    </button>
                    <button onClick={() => handleSuggestionClick(language === 'en' ? "What are the UNESCO World Heritage sites in Tamil Nadu?" : "தமிழ்நாட்டில் யுனெஸ்கோ உலக பாரம்பரிய தளங்கள் எவை?")}>
                        {language === 'en' ? "UNESCO Sites" : "யுனெஸ்கோ தளங்கள்"}
                    </button>
                    <button onClick={() => handleSuggestionClick(language === 'en' ? "Explain Tamil Nadu's classical dance forms" : "தமிழ்நாட்டின் பாரம்பரிய நடன வடிவங்களை விளக்குங்கள்")}>
                        {language === 'en' ? "Classical Dances" : "பாரம்பரிய நடனங்கள்"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;