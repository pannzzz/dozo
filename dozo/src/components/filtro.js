import React, { useState } from 'react';
import '../styles/Filtro.css';
import { useFilters } from './FilterContext'; // Importar el contexto de filtros

const Filtro = ({ onClose, productCount = 0 }) => {
    const { applyFilters } = useFilters(); // Obtener la función para aplicar filtros
    const [activePrices, setActivePrices] = useState([]); // Múltiples precios seleccionados
    const [selectedCategories, setSelectedCategories] = useState([]); // Múltiples categorías seleccionadas

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
        setActivePrices((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleCategoryClick = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const applyFilter = () => {
        const selectedRanges = activePrices.map((index) => priceRanges[index]);
        const filters = {
            prices: selectedRanges.map((range) => ({ min: range.min, max: range.max })),
            categories: selectedCategories,
        };
        applyFilters(filters); // Aplicar filtros
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
                                                    className={`js-priceBtn add-searchPriceSelect__button ${
                                                        activePrices.includes(index) ? 'active' : ''
                                                    }`}
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
                                                    className={`add-tagItem ${
                                                        selectedCategories.includes(category) ? 'active' : ''
                                                    }`}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtro;
