import React, { useState, useEffect } from 'react';
import '../styles/newsection.css';
import WhatsNewIcon from '../assets/whatsnewicon';

const NewsSectionComponent = () => {
    const [productsByCategory, setProductsByCategory] = useState([]); // Productos agrupados por categoría
    const [startIndex, setStartIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('slide-in');
    const itemsPerPage = 4;

    useEffect(() => {
        // Llama a la API para obtener productos
        fetch('http://localhost:8000/api/productos/')
            .then((response) => response.json())
            .then((data) => {
                // Agrupar productos por categoría
                const grouped = data.reduce((acc, product) => {
                    const categoryName = product.categoria?.nombre || 'Sin categoría';
                    if (!acc[categoryName]) acc[categoryName] = [];
                    acc[categoryName].push(product);
                    return acc;
                }, {});

                // Seleccionar un producto por categoría
                const representativeProducts = Object.values(grouped).map(
                    (categoryProducts) => categoryProducts[0]
                );

                setProductsByCategory(representativeProducts);
            })
            .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    const totalPages = Math.ceil(productsByCategory.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

    const handleNext = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % productsByCategory.length);
            setAnimationClass('slide-in');
        }, 600); // Duración de la animación
    };

    const handlePrev = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStartIndex((prevIndex) =>
                prevIndex === 0 ? productsByCategory.length - itemsPerPage : prevIndex - itemsPerPage
            );
            setAnimationClass('slide-in');
        }, 600); // Duración de la animación
    };

    const visibleProducts = productsByCategory.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="new-section-container">
            <div className="new-section-heading">
                <h3>IN YOUR STYLE</h3>
                <div className="underline"></div>
            </div>

            <div className="new-section-title">
                <WhatsNewIcon />
            </div>
            <p className="new-section-subtitle">Últimas novedades y prendas</p>
            <div className="new-section-slider">
                <div className="new-section-grid">
                    {visibleProducts.map((product, index) => (
                        <div key={product.id || index} className={`grid-item ${animationClass}`}>
                            <span className="image-date">
                                {new Date(product.fecha_publicacion || Date.now()).toLocaleDateString(
                                    'es-CO'
                                )}
                            </span>
                            <div className="image-container">
                                <img
                                    src={`http://localhost:8000/${product.imagen}`}
                                    alt={product.titulo}
                                />
                            </div>
                            <p>{product.titulo}</p>
                            {index < visibleProducts.length - 1 && <div className="vertical-line"></div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="add-js-articleSlider__nav">
                <button
                    className="add-js-articleSlider__navArrow add-is-prev"
                    onClick={handlePrev}
                >
                    <i className="bi bi-arrow-left-short"></i>
                </button>
                <div className="add-js-articleSlider__navNums">
                    <span data-current="">{String(currentPage).padStart(2, '0')}</span>
                    <span data-border=""></span>
                    <span data-max="">{String(totalPages).padStart(2, '0')}</span>
                </div>
                <button
                    className="add-js-articleSlider__navArrow add-is-next"
                    onClick={handleNext}
                >
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
        </div>
    );
};

export default NewsSectionComponent;
