import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Carousel.css';
import imagen1 from '../assets/imagen1.png';
import imagen2 from '../assets/imagen2.png';
import imagen3 from '../assets/imagen3.png';

const CarouselComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // Inicializa useNavigate
    const images = [imagen1, imagen2, imagen3];

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <div className="carousel-background">
            <div className="carousel-container">
                <div className="carousel">
                    <img src={images[currentIndex]} alt="carousel slide" className="carousel-image" />
                    <div className="next-container" onClick={goToNext}>
                        <span className="next-text">Próximo</span>
                        <i className="bi bi-arrow-right-square next-icon"></i>
                    </div>
                </div>

                {/* Botón en la parte inferior que redirige a la sección "About" */}
                <div className="carousel-bottom">
                    <button
                        className="carousel-bottom-button"
                        onClick={() => navigate('/about')} // Redirige a la página About
                    >
                        ¿Qué es el dōzo?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
