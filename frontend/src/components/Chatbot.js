import React, { useState } from "react";
import { sendTextQuery } from "../services/api";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleQuery = async () => {
        if (!query.trim()) return;
        const result = await sendTextQuery(query);
        setResponse(result.answer);
    };

    return (
        <div className="chatbot-container">
            <h2>AI Heritage Chatbot</h2>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Ask about Tamil Nadu heritage..." 
            />
            <button onClick={handleQuery}>Send</button>
            <div className="response">{response}</div>
        </div>
    );
};

export default Chatbot;
