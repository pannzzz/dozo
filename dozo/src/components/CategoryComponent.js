import React from 'react';
import '../styles/category.css';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import { useFilters } from './FilterContext'; // Importar el contexto de filtros
import CategoryIcon from '../assets/categoryicon';
import cat1 from '../assets/img-category/camisetas.png';
import cat2 from '../assets/img-category/pantalones.png';
import cat3 from '../assets/img-category/camisas.png';
import cat4 from '../assets/img-category/accesorios.png';
import cat5 from '../assets/img-category/overoles.png';
import cat6 from '../assets/img-category/chaquetas.png';
import cat7 from '../assets/img-category/faldas.png';
import cat8 from '../assets/img-category/blusas.png';

// Lista de categorías con su imagen y etiqueta
const categories = [
    { src: cat1, label: 'Camisetas' },
    { src: cat2, label: 'Pantalones' },
    { src: cat3, label: 'Camisas' },
    { src: cat4, label: 'Accesorios' },
    { src: cat5, label: 'Overoles' },
    { src: cat6, label: 'Chaquetas' },
    { src: cat7, label: 'Faldas' },
    { src: cat8, label: 'Blusas' },
];

const CategoryComponent = () => {
    const navigate = useNavigate(); // Para redirigir a la página de productos
    const { applyFilters } = useFilters(); // Obtener la función para aplicar filtros

    const handleCategoryClick = (category) => {
        applyFilters({ categories: [category] }); // Aplicar filtro de categoría como arreglo
        navigate('/findgift'); // Redirigir a la página de productos
    };

    return (
        <div className="category-section-container">
            <div className="category-header">
                <h3>IN YOUR STYLE</h3>
                <CategoryIcon />
                <p>Buscar por categoría</p>
            </div>
            <div className="category-grid">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-item"
                        onClick={() => handleCategoryClick(category.label)} // Manejar clic en categoría
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={category.src} alt={`Categoría ${category.label}`} />
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryComponent;
