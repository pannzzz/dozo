import React, { useState, useEffect } from 'react';
import '../styles/pickupsection.css';
import { Link } from 'react-router-dom';
import PickupIcon from '../assets/pickupicon';

const PickUpSectionComponent = () => {
    const [productos, setProductos] = useState([]); // Productos dinámicos
    const [currentPage, setCurrentPage] = useState(1);
    const [animationClass, setAnimationClass] = useState('');
    const itemsPerPage = 4;

    useEffect(() => {
        // Llama a la API para obtener productos
        fetch('http://localhost:8000/api/productos/')
            .then((response) => response.json())
            .then((data) => {
                // Limitar a los primeros 12 productos
                setProductos(data.slice(0, 12));
            })
            .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    const totalPages = Math.ceil(productos.length / itemsPerPage);

    const handleNext = () => {
        setAnimationClass('slide-out-left');
        setTimeout(() => {
            setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
            setAnimationClass('slide-in-right');
        }, 500);
    };

    const handlePrev = () => {
        setAnimationClass('slide-out-right');
        setTimeout(() => {
            setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
            setAnimationClass('slide-in-left');
        }, 500);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = productos.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pickup-section-container">
            <div className="gift-story-header">
                <p>IN YOUR STYLE</p>
                <div className="underline"></div>
                <PickupIcon />
            </div>
            <p className="pickup-subtitle">¡Este es el mejor dozo del mes!</p>

            <ul className="pickup-grid">
                {visibleItems.map((item, index) => (
                    <li key={item.id || index} className={`pickup-item ${animationClass}`}>
                        <div className="image-container">
                            <img
                                src={`http://localhost:8000/${item.imagen}`}
                                alt={item.titulo}
                                className="pickup-image"
                            />
                        </div>
                        <div className="pickup-item-title">{item.titulo}</div>
                        <div className="pickup-item-tag">{item.categoria?.nombre || 'Sin categoría'}</div>
                        <div className="pickup-item-price">${item.precio.toLocaleString('es-CO')} COP</div>
                        <div className="pickup-item-description">{item.descripcion}</div>
                        <Link to={`/detalles/${item.id}`}>
                            <button className="pickup-button">Más detalles</button>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="pickup-navigation">
                <button className="pickup-nav-button" onClick={handlePrev}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>
                <span className="pickup-page-indicator">
                    {String(currentPage).padStart(2, '0')} — {String(totalPages).padStart(2, '0')}
                </span>
                <button className="pickup-nav-button" onClick={handleNext}>
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
        </div>
    );
};

export default PickUpSectionComponent;
