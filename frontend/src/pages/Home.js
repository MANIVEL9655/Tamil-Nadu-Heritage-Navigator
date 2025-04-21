import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Tamil Nadu's Rich Heritage</h1>
                    <p>Explore the cultural treasures, ancient temples, and historical landmarks of Tamil Nadu through our interactive platform.</p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/chatbot')}>
                            Start Exploring
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section className="features section">
                <div className="container">
                    <h2 className="heading">Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">🏛️</div>
                            <h3>Heritage Sites</h3>
                            <p>Explore detailed information about Tamil Nadu's UNESCO World Heritage sites and ancient monuments.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">🗣️</div>
                            <h3>Bilingual Support</h3>
                            <p>Access information in both English and Tamil languages for a better understanding of our heritage.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Chatbot</h3>
                            <p>Interact with our intelligent chatbot to get instant answers about Tamil Nadu's cultural heritage.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">🎯</div>
                            <h3>Interactive Maps</h3>
                            <p>Navigate through heritage sites with our interactive maps and location-based information.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Explore?</h2>
                        <p>Start your journey through Tamil Nadu's rich cultural heritage today.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/chatbot')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;