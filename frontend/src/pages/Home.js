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
                    <h2 className="heading">Famous Heritage Places</h2>
                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <img src="/images/feature1.jpg" alt="Heritage Sites" />
                            </div>
                            <h3>Brihadeeswara Temple</h3>
                            <p>Brihadeeswara Temple, located in Thanjavur, Tamil Nadu, is a magnificent 11th-century Chola architectural marvel dedicated to Lord Shiva.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <img src="/images/feature2.jpg" alt="Bilingual Support" />
                            </div>
                            <h3>Mamallapuram Shore Temple</h3>
                            <p>The Mamallapuram Shore Temple is an ancient granite temple complex built in the 8th century by the Pallava dynasty, showcasing remarkable Dravidian architecture by the sea.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <img src="/images/feature3.jpg" alt="AI Chatbot" />
                            </div>
                            <h3>Gangaikonda Cholapuram</h3>
                            <p>Gangaikonda Cholapuram isbuilt by Rajendra Chola I to commemorate his victorious march to the Ganges and serve as the capital of the Chola dynasty.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <img src="/images/feature4.jpg" alt="Interactive Maps" />
                            </div>
                            <h3>Sri Meenakshi Temple</h3>
                            <p>Sri Meenakshi Temple is a historic and architecturally magnificent Hindu temple located in Madurai, Tamil Nadu.</p>
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