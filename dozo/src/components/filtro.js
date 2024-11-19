import React, { useState } from 'react';
import '../styles/Filtro.css';
import { useFilters } from './FilterContext'; // Importar el contexto de filtros

const Filtro = ({ onClose, productCount = 0 }) => {
    const { applyFilters } = useFilters(); // Obtener la función para aplicar filtros
    const [activePrice, setActivePrice] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const priceRanges = [
        { min: 30000, max: 50000, label: 'De $30,000 a $50,000' },
        { min: 50001, max: 100000, label: 'De $50,001 a $100,000' },
        { min: 100001, max: 300000, label: 'De $100,001 a $300,000' },
        { min: 300001, max: 500000, label: 'De $300,001 a $500,000' },
    ];

    const categories = [
        'Camisetas',
        'Pantalones',
        'Camisas',
        'Accesorios',
        'Overoles',
        'Chaquetas',
        'Faldas',
        'Blusas',
    ];

    const handlePriceClick = (index) => {
        setActivePrice(index);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category); // Alternar la selección
    };

    const applyFilter = () => {
        const selectedRange = activePrice !== null ? priceRanges[activePrice] : null;
        const filters = {
            ...(selectedRange && { min: selectedRange.min, max: selectedRange.max }),
            ...(selectedCategory && { category: selectedCategory }), // Aplicar la categoría seleccionada
        };
        applyFilters(filters); // Aplicar filtros
        onClose(); // Cerrar el filtro
    };

    const clearFilters = () => {
        setActivePrice(null);
        setSelectedCategory(null);
        applyFilters({}); // Restablecer filtros
        onClose(); // Cerrar el filtro
    };

    return (
        <div className="add-js-searchDetailModal__box">
            <div className="add-js-searchDetailModal__inner">
                <button className="filtro-close" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <div className="add-searchDetail add-js-searchDetailAccordion">
                    <div className="add-searchDetail__themeSelected">
                        <span className="num">{productCount}</span>
                        <span className="texto">Selección de Productos</span>
                    </div>
                    <div className="add-searchDetail__queries">
                        {/* Grupo de precio */}
                        <div className="add-searchDetail__group">
                            <div className="add-searchDetail__groupTitle">
                                <img
                                    src="https://auth.dozo-gift.com/front/v1_1/images/common/text/search-price.svg"
                                    alt="Precio"
                                />
                                <span>Precio</span>
                            </div>
                            <div className="add-searchDetail__groupBody">
                                <div className="add-searchPriceSelect">
                                    <ul>
                                        {priceRanges.map((range, index) => (
                                            <li key={index}>
                                                <button
                                                    className={`js-priceBtn add-searchPriceSelect__button ${activePrice === index ? 'active' : ''}`}
                                                    type="button"
                                                    onClick={() => handlePriceClick(index)}
                                                >
                                                    <span className="add-icon"></span>
                                                    <span className="add-text">{range.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Grupo de categoría */}
                        <div className="add-searchDetail__group add-is-active">
                            <div className="add-searchDetail__groupTitle">
                                <img
                                    src="https://auth.dozo-gift.com/front/v1_1/images/common/text/search-category.svg"
                                    alt="Categoría"
                                />
                                <span>Categoría</span>
                            </div>
                            <div className="add-searchDetail__groupBody">
                                <div className="add-tagList">
                                    <ul>
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    className={`add-tagItem ${selectedCategory === category ? 'active' : ''}`}
                                                    onClick={() => handleCategoryClick(category)}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="botonn">
                        <button type="button" className="boton" onClick={applyFilter}>
                            Aplicar filtros
                        </button>
                        <button
                            type="button"
                            className="boton"
                            onClick={clearFilters}
                            style={{ backgroundColor: '#D89B67' }} // Color diferente para "Quitar filtros"
                        >
                            Quitar filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtro;
