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
                        <div className="mission-text">
                            <h2 className="heading">Our Vision</h2>
                            <p>A bilingual heritage assistant that empowers users—especially tourists and heritage enthusiasts—to seamlessly explore the rich cultural and historical landmarks of Tamil Nadu.</p>
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

        </div>
    );
}

export default About;