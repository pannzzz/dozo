import React, { useState, useEffect } from 'react';
import '../styles/rankin.css';
import { Link } from 'react-router-dom';

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
        <div className="rankin-section-container">
            <div className="gift-story-header">
                <p>IN YOUR STYLE</p>
                <div className="underline"></div>
                <span className="add-sectionTitle__text-02">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                className="add-js-svgTitle"
                width="232"
                height="50"
                viewBox="0 0 231.1 49.5"
            >
                <style>{`.st0{fill:#191615}`}</style>
                {/* Paths del SVG */}
                <path
                id="R"
                d="M10.8 28.8c-3.9-.8-4.3-4.1-4.3-5.9-.2-2.7 1.7-5.2 4.3-5.8V13c0-2.1 1.3-2.4 2.4-2.4h5.7c1.1 0 4.3 0 4.3 3.6 0 3.9-3.7 3.9-5.2 3.9h-5.3c-1.5 0-5.1 0-5.1 4.8 0 4.6 3.6 4.8 5.1 4.8H18c4.1 0 4.1 2.6 4.1 3.7.1 8 .1 12 5.9 12 3.8 0 5.3-1.5 5.3-4.2 0-.7-.3-3.7-.4-4.4-.3-7.6-.3-9.5-3-11.5 1.3-1.1 4.2-3.4 4.2-9.2 0-7-4-10.2-7.3-11.8-.9-.4-2.5-1.2-7.7-1.2H7.3C1.1 1.1 0 5.2 0 8.5v29.8c0 3.6 1.9 5.1 5.5 5.1 5.2 0 5.3-3.8 5.3-5.1v-9.5z"/>
                <path id="a" d="M57 32.4c3.9-.5 5.4 2.7 5.4 5 0 1-.2 3.2-3.8 5 .4.4 1.2 1 3.8 1 3.7 0 5.3-1.5 5.3-3.5 0-.9-.5-3.2-.5-3.5V21c0-4.9-2.9-10.4-13.3-10.4-11.8 0-14.2 7.1-14.2 9.7-.1 1.9 1.2 3.5 3.1 3.8 2.1-1 4.3-1.7 6.6-2 .6-1.4 1.2-3 4.5-3 2.8 0 3 1.5 3 2 0 1.2-1.5 1.5-5.7 2-5.4.8-12.2 2.2-12.2 10.2 0 4.8 2.6 10.3 10.9 10.3 4.8 0 11.3-2.2 11.3-6 .1-2-1.4-3.8-3.4-3.9h-.1c-.7 0-1.4.2-2 .6-1.1.8-2.4 1.3-3.7 1.4-1.1.2-2.1-.6-2.3-1.7v-.5c0-1.9 1.6-2.3 3-2.7 3.5-.9 3.8-1 4.5-1.4l-.2 3z"></path>
                <path id="n" d="M103.1 24.4c0-4.1 0-13.9-11.7-13.9-4.2 0-10.2 2-10.2 6-.1 2.5 1.8 4.6 4.2 4.8.7 0 1.4-.2 2-.5 1.5-.9 2.1-1.2 2.8-1.2 2.3 0 2.4 3.1 2.4 4.6v14.5c0 4.3 2.8 4.9 5.4 4.9 5.1 0 5.1-3.6 5.1-4.9V24.4zm-17.7-1.9c-5.1-.5-5.4-5.3-5.4-6.1 0-2.5 1.5-3.9 3.7-5-.8-.5-1.3-.9-3.6-.9-3.8 0-5.2 1.9-5.2 4.9v23.1c0 4.3 2.8 4.9 5.4 4.9 4.6 0 5.1-3.1 5.1-4.9v-16z"></path>
                <path id="k" d="M123.6 33.1c-.5-.8-.8-1.8-.8-2.8 0-3.3 3.2-6.6 7.1-6.6 1-.1 2.1.2 2.9.9l5.4-5c1-.9 1.6-2.2 1.7-3.5 0-2-2.4-5.5-5.7-5.5-1.3 0-2.2.5-3.5 1.8l-9.4 8.6V5c0-4.2-2.7-4.9-5.4-4.9-4.8 0-5 3.2-5 4.9v33.6c0 4.2 2.7 4.9 5.4 4.9 4.6 0 5-3.2 5-4.9v-3.2l2.3-2.3zm6.7 7.7c.9 1.3 1.8 2.6 4 2.6 3.2 0 5.9-2.8 5.9-5.2-.1-1-.4-1.9-1-2.8l-5.8-8.5c-.8-1.1-2.1-1.9-3.5-2-3.2 0-6 2.6-6 5.4.1 1.2.6 2.3 1.3 3.2l5.1 7.3z"></path>
                <path id="i" d="M156.2 15.4c.1-1.5-.5-3-1.7-4-1.1.7-2.3 1-3.6 1-1.3.1-2.5-.3-3.6-1-1.1 1-1.7 2.5-1.6 4v23.1c0 4.2 2.7 4.9 5.4 4.9 4.7 0 5.1-3.2 5.1-4.9V15.4zM150.9 0c-3.1 0-5.6 2.5-5.6 5.6 0 3.1 2.5 5.5 5.5 5.5 3.1 0 5.5-2.5 5.6-5.5 0-3-2.4-5.6-5.4-5.6h-.1z"></path>
                <path id="n_00000002354252603753798160000008449959666678097055_" d="M192.1 24.4c0-4.1 0-13.9-11.7-13.9-4.2 0-10.2 2-10.2 6-.1 2.5 1.8 4.6 4.2 4.8.7 0 1.4-.2 2-.5 1.6-.9 2.1-1.2 2.8-1.2 2.3 0 2.4 3.1 2.4 4.6v14.5c0 4.3 2.8 4.9 5.4 4.9 5 0 5-3.6 5-4.9V24.4zm-17.7-1.9c-5.1-.5-5.4-5.3-5.4-6.1 0-2.5 1.6-3.9 3.7-5-.8-.5-1.3-.9-3.6-.9-3.8 0-5.1 1.9-5.1 4.9v23.1c0 4.3 2.8 4.9 5.4 4.9 4.6 0 5.1-3.1 5.1-4.9v-16z"></path>
                <path id="g" d="M218 30.2c-8.6-.5-9.5-.5-9.5-1.5 0-.3.2-.5.3-.8 1.8.3 3.6.5 5.3.5 5.8 0 13.4-2 13.1-8.8 2.1 0 3.9-.2 3.9-4.5 0-2.4-.8-4.5-3.6-4.5-1.7 0-3.4.6-4.9 1.6-1.4-.6-3.5-1.6-9.1-1.6-11.8 0-13.8 5.9-13.8 9.1-.1 2.1.8 4 2.4 5.3-1.8 1.1-3 3.1-3 5.2-.1 1 .2 1.9.7 2.7 1.1-.7 2.5-1 3.8-1 3.8 0 6.1 2 6.5 5.6 2.8 0 5.5.2 8.3.5.8.2 1.7.5 1.7 1.4 0 2.1-4.4 2.1-5.3 2.1-.9 0-6.5 0-6.5-2.5 0-.2.5-1.5.5-1.8 0-2.2-2-4.1-5.2-4.1-6 0-6 6.5-6 6.9 0 8 9.6 9.4 15.8 9.4 5 0 17.3-.6 17.3-10.4.1-8-8.9-8.6-12.7-8.8zm-4.4-12.6c1.4 0 3.4.5 3.4 2.3 0 1.7-2.1 2-3.4 2-1.4 0-3.3-.4-3.3-2.1-.1-1.7 1.9-2.2 3.3-2.2z"></path>
            </svg>
            </span>
            </div>
            <p className="rankin-subtitle">El dōzo de esta semana</p>

            <ul className="rankin-grid">
                {visibleItems.map((item, index) => (
                    <li key={item.id || index} className={`rankin-item ${animationClass}`}>
                        <div class="add-goodsItem__number">
                        <font _mstmutation="1" _msttexthash="30394" _msthash="553"><span _mstmutation="1" _istranslated="1">No.</span>  <span _mstmutation="1" _istranslated="1">1</span></font>
                        </div>
                        <div className="image-container">
                            <img
                                src={`http://localhost:8000/${item.imagen}`}
                                alt={item.titulo}
                                className="rankin-image"
                            />
                        </div>
                        <div className="rankin-item-title">{item.titulo}</div>
                        <div className='rankin_info'>
                        <div className="rankin-item-tag">{item.categoria?.nombre || 'Sin categoría'}</div>
                        <div className="rankin-item-price">${item.precio.toLocaleString('es-CO')} COP</div>
                        </div>
                        <div className="rankin-item-description">{item.descripcion}</div>
                        <Link to={`/detalles/${item.id}`}>
                            <button className="rankin-button">Más detalles</button>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="rankin-navigation">
                <button className="rankin-nav-button" onClick={handlePrev}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>
                <span className="rankin-page-indicator">
                    {String(currentPage).padStart(2, '0')} — {String(totalPages).padStart(2, '0')}
                </span>
                <button className="rankin-nav-button" onClick={handleNext}>
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
        </div>
    );
};

export default PickUpSectionComponent;
