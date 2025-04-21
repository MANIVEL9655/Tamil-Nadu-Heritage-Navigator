import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to Tamil Nadu Heritage Explorer</h1>
            <p>Discover the rich cultural heritage of Tamil Nadu through our interactive chatbot</p>
            
            <div className="cta-buttons">
                <button onClick={() => navigate('/chatbot')}>Try Chatbot</button>
                <button onClick={() => navigate('/about')}>Learn More</button>
            </div>
            
            <div className="feature-cards">
                <div className="card">
                    <h3>Bilingual Support</h3>
                    <p>Get information in both English and Tamil</p>
                </div>
                <div className="card">
                    <h3>Rich Heritage Data</h3>
                    <p>Detailed information about Tamil Nadu's heritage sites</p>
                </div>
            </div>
        </div>
    );
}

export default Home;