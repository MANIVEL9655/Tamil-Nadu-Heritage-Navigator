import React from 'react';

function LanguageToggle({ language, setLanguage }) {
    return (
        <div className="language-toggle">
            <button 
                className={language === 'english' ? 'active' : ''}
                onClick={() => setLanguage('english')}
            >
                English
            </button>
            <button 
                className={language === 'tamil' ? 'active' : ''}
                onClick={() => setLanguage('tamil')}
            >
                தமிழ்
            </button>
        </div>
    );
}

export default LanguageToggle;
