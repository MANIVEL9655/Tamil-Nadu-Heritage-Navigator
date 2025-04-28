import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import feature1 from '../components/images/feature1.jpg';
import feature2 from '../components/images/feature2.jpg';
import feature3 from '../components/images/feature3.jpg';
import feature4 from '../components/images/feature4.jpg';
import feature5 from '../components/images/feature5.jpg';
import feature6 from '../components/images/feature6.jpg';
import feature7 from '../components/images/feature7.jpg';
import feature8 from '../components/images/feature8.jpg';

function Home() {
    const navigate = useNavigate();
    const featuresGridRef = useRef(null);

    const scrollFeatures = (direction) => {
        const grid = featuresGridRef.current;
        const scrollAmount = grid.clientWidth;
        grid.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

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
                    <div className="features-section">
                        <button className="scroll-button left" onClick={() => scrollFeatures('left')}>
                            ←
                        </button>
                        <div className="features-grid" ref={featuresGridRef}>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature1} alt="Heritage Sites" />
                                </div>
                                <h3>Brihadeeswara Temple</h3>
                                <p>Brihadeeswara Temple, located in Thanjavur, Tamil Nadu, is a magnificent 11th-century Chola architectural marvel dedicated to Lord Shiva.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature2} alt="Bilingual Support" />
                                </div>
                                <h3>Mamallapuram Shore Temple</h3>
                                <p>The Mamallapuram Shore Temple is an ancient granite temple complex built in the 8th century by the Pallava dynasty, showcasing remarkable Dravidian architecture by the sea.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature3} alt="AI Chatbot" />
                                </div>
                                <h3>Gangaikonda Cholapuram</h3>
                                <p>Gangaikonda Cholapuram is built by Rajendra Chola I to commemorate his victorious march to the Ganges and serve as the capital of the Chola dynasty.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature4} alt="Interactive Maps" />
                                </div>
                                <h3>Sri Meenakshi Temple</h3>
                                <p>Sri Meenakshi Temple is a historic and architecturally magnificent Hindu temple located in Madurai, Tamil Nadu.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature5} alt="Airavatesvara Temple" />
                                </div>
                                <h3>Airavatesvara Temple</h3>
                                <p>Airavatesvara Temple in Darasuram is a UNESCO World Heritage Site known for its intricate stone carvings and architectural brilliance from the Chola period.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature6} alt="Ramanathaswamy Temple" />
                                </div>
                                <h3>Ramanathaswamy Temple</h3>
                                <p>Ramanathaswamy Temple in Rameswaram is one of the twelve Jyotirlinga temples, famous for its magnificent corridors and sacred significance.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature7} alt="Thiruvannamalai Temple" />
                                </div>
                                <h3>Thiruvannamalai Temple</h3>
                                <p>Arunachaleswarar Temple in Thiruvannamalai is one of the largest temple complexes in India, dedicated to Lord Shiva and known for its grand architecture.</p>
                            </div>
                            <div className="feature-card card">
                                <div className="feature-icon">
                                    <img src={feature8} alt="Kailasanathar Temple" />
                                </div>
                                <h3>Kailasanathar Temple</h3>
                                <p>Kailasanathar Temple in Kanchipuram is one of the oldest temples in South India, showcasing early Dravidian architecture from the Pallava period.</p>
                            </div>
                        </div>
                        <button className="scroll-button right" onClick={() => scrollFeatures('right')}>
                            →
                        </button>
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