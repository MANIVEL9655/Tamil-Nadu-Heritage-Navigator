import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Tamil Nadu Heritage
                </Link>
                
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={`nav-link ${isActive('/')}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/about" 
                            className={`nav-link ${isActive('/about')}`}
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/chatbot" 
                            className={`nav-link ${isActive('/chatbot')}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Chatbot
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
