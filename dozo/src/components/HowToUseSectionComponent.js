import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/howtouse.css';
import img1 from '../assets/img-howto/howtouse-comic-01.png';
import img2 from '../assets/img-howto/howtouse-comic-02.png';
import img3 from '../assets/img-howto/howtouse-comic-03.png';
import img4 from '../assets/img-howto/howtouse-comic-04.png';
import img5 from '../assets/img-howto/howtouse-comic-05.png';
import img6 from '../assets/img-howto/howtouse-comic-06.png';
import img7 from '../assets/img-howto/howtouse-comic-07.png';
import img8 from '../assets/img-howto/howtouse-comic-08.png';
import WhatsNewIcon from '../assets/howtouseicon';

const NewsSectionComponent = () => {
    const navigate = useNavigate(); // Inicializa useNavigate para la navegación
    const images = [
        { src: img1 },
        { src: img2 },
        { src: img3 },
        { src: img4 },
        { src: img5 },
        { src: img6 },
        { src: img7 },
        { src: img8 }
    ];

    const [startIndex, setStartIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('slide-in');
    const itemsPerPage = 4;
    const totalPages = Math.ceil(images.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

    const handleNext = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % images.length);
            setAnimationClass('slide-in');
        }, 600);
    };

    const handlePrev = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStartIndex((prevIndex) => (prevIndex === 0 ? images.length - itemsPerPage : prevIndex - itemsPerPage));
            setAnimationClass('slide-in');
        }, 600);
    };

    const visibleImages = images.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="how-section-container">
            <div className="how-section-heading">
                <h3>IN YOUR STYLE</h3>
                <div className="underline"></div>
            </div>

            <div className="how-section-title">
                <WhatsNewIcon />
            </div>
            <p className="how-section-subtitle">La historia que comienza con dozo</p>
            <p className="how-section-description">
                <span>dozo es un servicio sociales que permite</span><br />
                <span>a los destinatarios elegir y recibir sus prendas favoritas.</span>
            </p>

            <div className="how-section-slider">
                <div className="how-section-grid">
                    {visibleImages.map((image, index) => (
                        <div key={index} className={`how-grid-item ${animationClass}`}>
                            <div className="how-image-container">
                                <img src={image.src} alt={`Noticia ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="add-js-articleSlider__nav">
                <button className="add-js-articleSlider__navArrow add-is-prev" onClick={handlePrev}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>
                <div className="add-js-articleSlider__navNums">
                    <span data-current="">{String(currentPage).padStart(2, '0')}</span>
                    <span data-border=""></span>
                    <span data-max="">{String(totalPages).padStart(2, '0')}</span>
                </div>
                <button className="add-js-articleSlider__navArrow add-is-next" onClick={handleNext}>
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
            
            {/* Botón para redirigir a otra página */}
            <button className="how-main-button" onClick={() => navigate('/howto')}>
                Cómo usar dozo
            </button>
        </div>
    );
};

export default NewsSectionComponent;