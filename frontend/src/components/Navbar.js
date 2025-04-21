import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Chatbot from './pages/Chatbot';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
