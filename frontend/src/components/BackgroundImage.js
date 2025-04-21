import React, { useEffect } from 'react';

/**
 * Component to handle background images with fallbacks
 * This component sets CSS variables for background images when they're available
 */
function BackgroundImage() {
    useEffect(() => {
        // Function to check if an image exists
        const checkImage = (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        // Function to set background image CSS variable
        const setBackgroundImage = async (imagePath, cssVariable) => {
            const imageExists = await checkImage(imagePath);
            if (imageExists) {
                document.documentElement.style.setProperty(
                    cssVariable,
                    `url('${imagePath}') center/cover no-repeat`
                );
            }
        };

        // Check and set background images
        setBackgroundImage('/images/tamil-nadu-temple.jpg', '--hero-bg-image');
        setBackgroundImage('/images/tamil-nadu-heritage.jpg', '--about-hero-bg-image');
    }, []);

    return null; // This component doesn't render anything
}

export default BackgroundImage; 