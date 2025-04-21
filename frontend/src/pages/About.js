import React from 'react';

function About() {
    return (
        <div className="about-container">
            <h1>About Tamil Nadu Heritage Explorer</h1>
            <p>
                This application provides detailed information about heritage sites in Tamil Nadu,
                using advanced AI technology to deliver accurate and engaging content in both English and Tamil.
            </p>
            
            <h2>Features</h2>
            <ul>
                <li>Bilingual chatbot interface (English/Tamil)</li>
                <li>Detailed historical information</li>
                <li>Context-aware responses</li>
                <li>Voice input/output support</li>
            </ul>
            
            <h2>Technology Stack</h2>
            <p>
                Powered by LLAMA 2, Whisper for speech recognition, and advanced RAG techniques
                for accurate information retrieval.
            </p>
        </div>
    );
}

export default About;
