import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import searchIcon from '../assets/icons/ic-search.svg';
import filterIcon from '../assets/icons/icon-toggle.svg';
import newIcon from '../assets/icons/icon-sort-new.png';
import BuscarIcon from '../assets/icons/search';
import '../styles/FindGiftPage.css';
import Card from '../components/ProductCard';
import Filtro from '../components/filtro';
import { useFilters } from '../components/FilterContext'; // Importar el contexto de filtros
import FooterComponent from '../components/FooterComponent';


const FindGiftPage = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [productCount, setProductCount] = useState(0); // Estado para el conteo de productos
    const { applyFilters } = useFilters(); // Obtener la función para aplicar filtros

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        applyFilters({ search: searchQuery }); // Aplicar filtro de búsqueda por palabra clave
    };

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="find-gift-page">
                <div className="sub-navbar">
                    <h2>
                        <span className="number-text">{productCount}</span> Productos
                    </h2>
                    <div className="sub-navbar-actions">
                        <form className="sub-search-form" onSubmit={handleSearch}>
                            <button type="submit" className="sub-search-button">
                                <img src={searchIcon} alt="Buscar" className="search-icon" />
                            </button>
                            <input
                                type="text"
                                placeholder="Búsqueda por palabra clave"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                        <button className="sub-action-button" onClick={toggleFilterModal}>
                            <img src={filterIcon} alt="Filtrar" className="filter-icon" />
                        </button>
                        <button className="sub-action-button new-button">
                            <img src={newIcon} alt="Nuevo" className="new-icon" />
                        </button>
                    </div>
                </div>

                {isFilterModalOpen && <Filtro onClose={toggleFilterModal} productCount={productCount} />} {/* Pasar productCount */}

                <div className="content">
                    <a href="/" className="breadcrumb-find">Dozo</a> / Encuentra un regalo
                    <h2>IN YOUR STYLE</h2>
                    <div className="underline1"></div>
                    <h1><BuscarIcon /></h1>
                </div>
                <Card onProductCountChange={setProductCount} /> {/* Pasar setProductCount */}
            </div>
            <div className="add-goodsList__info">
                                    <img
                                    className="imagenunu"
                                        src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-toggle.svg"
                                        alt=""
                                    />
                                    <div className="add-textunu">
                                        <p className="add-text__emphunu">
                                            Puedes filtrar desde el botón de arriba.
                                        </p>
                                        <p className='parrafo'> Por precio o por categoría</p>
                                    </div>
                                </div>
            <FooterComponent />
        </>
    );
};

export default FindGiftPage;
