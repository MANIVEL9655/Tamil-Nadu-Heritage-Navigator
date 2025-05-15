import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about">
            <section className="about-hero section">
                <div className="container">
                    <h1 className="heading">About Tamil Nadu Heritage Navigator</h1>
                    <p className="subtitle">Preserving and sharing the rich cultural heritage of Tamil Nadu through technology</p>
                </div>
            </section>

            <section className="mission section">
                <div className="container">
                    <div className="mission-content">
                        <div className="mission-text">
                            <h2 className="heading">Our Mission</h2>
                            <p>We are dedicated to preserving and promoting Tamil Nadu's rich cultural heritage through innovative technology solutions. Our platform aims to make heritage information accessible, engaging, and interactive for everyone.</p>
                        </div>
                        <div className="mission-stats">
                            <div className="stat-card card">
                                <h3>100+</h3>
                                <p>Heritage Sites</p>
                            </div>
                            <div className="stat-card card">
                                <h3>2</h3>
                                <p>Languages</p>
                            </div>
                            <div className="stat-card card">
                                <h3>24/7</h3>
                                <p>AI Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="features section">
                <div className="container">
                    <h2 className="heading">Key Features</h2>
                    <div className="features-list">
                        <div className="feature-item card">
                            <div className="feature-icon">🤖</div>
                            <div className="feature-content">
                                <h3>AI-Powered Chatbot</h3>
                                <p>Our intelligent chatbot provides instant answers to your questions about Tamil Nadu's heritage sites, history, and culture.</p>
                            </div>
                        </div>
                        <div className="feature-item card">
                            <div className="feature-icon">🌐</div>
                            <div className="feature-content">
                                <h3>Bilingual Support</h3>
                                <p>Access information in both English and Tamil languages for a better understanding of our cultural heritage.</p>
                            </div>
                        </div>
                        <div className="feature-item card">
                            <div className="feature-icon">📱</div>
                            <div className="feature-content">
                                <h3>Mobile Friendly</h3>
                                <p>Explore heritage sites on any device with our responsive and user-friendly interface.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="technology section">
                <div className="container">
                    <h2 className="heading">Technology Stack</h2>
                    <div className="tech-grid">
                        <div className="tech-card card">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React.js</li>
                                <li>Modern UI/UX</li>
                                <li>Responsive Design</li>
                            </ul>
                        </div>
                        <div className="tech-card card">
                            <h3>Backend</h3>
                            <ul>
                                <li>Python</li>
                                <li>LLAMA 2</li>
                                <li>Whisper API</li>
                            </ul>
                        </div>
                        <div className="tech-card card">
                            <h3>Features</h3>
                            <ul>
                                <li>AI Chatbot</li>
                                <li>Voice Recognition</li>
                                <li>Bilingual Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
}

export default About;