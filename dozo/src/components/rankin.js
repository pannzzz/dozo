import React, { useState, useEffect } from 'react';
import '../styles/rankin.css';
import { Link } from 'react-router-dom';
import RankingIcon from '../assets/ranking';


const PickUpSectionComponent = () => {
    const [productos, setProductos] = useState([]); // Productos dinámicos
    const [currentPage, setCurrentPage] = useState(1);
    const [animationClass, setAnimationClass] = useState('');
    const itemsPerPage = 4;

    useEffect(() => {
        // Llama a la API para obtener productos
        fetch('http://localhost:8000/productos-mas-vendidos/') // Ajusta la ruta de la API
            .then((response) => response.json())
            .then((data) => {
                // Limitar a los 10 productos más vendidos
                const productosTop10 = data.productos.slice(0, 10).map((producto) => ({
                    ...producto,
                    imagen: producto.imagen.startsWith('http')
                        ? producto.imagen
                        : `http://localhost:8000${producto.imagen}`, // Construye la URL completa si es relativa
                }));
                setProductos(productosTop10); // Actualiza con el top 10
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
            <div className="rankin-header">
            <p>IN YOUR STYLE</p>
                <div className="underline-rankin"></div>
                <span className="add-sectionTitle__text-02">
                <RankingIcon />
            </span>
            </div>
            <p className="rankin-subtitle">El Ranking de esta semana</p>
            <ul className="rankin-grid">
                {visibleItems.map((item, index) => (
                    <li key={item.id || index} className={`rankin-item ${animationClass}`}>
                        <div className="add-goodsItem__number">
                            <span>No.</span> <span>{startIndex + index + 1}</span>
                        </div>
                        <div className="imagerankin-container">
                            <img
                                src={item.imagen}
                                alt={item.titulo}
                                className="rankin-image"
                            />
                        </div>
                        <div className="rankin-item-title">{item.titulo}</div>
                        <div className="rankin_info">
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
