import React, { useEffect, useState } from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useFilters } from './FilterContext'; // Importar el contexto de filtros

const ProductCardComponent = ({ onProductCountChange }) => {
    const [productos, setProductos] = useState([]); // Todos los productos
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
    const [visibleProducts, setVisibleProducts] = useState([]); // Productos visibles
    const [loading, setLoading] = useState(true); // Estado de carga
    const [showAll, setShowAll] = useState(false); // Alternar entre mostrar más o menos productos
    const { filters, applyFilters } = useFilters(); // Filtros desde el contexto
    const { addToCart } = useCart(); // Función para añadir al carrito

    // Estado para controlar el modal y talla seleccionada
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [selectedSize, setSelectedSize] = useState(null); // Talla seleccionada

    const PRODUCTS_INITIAL = 20; // Cantidad inicial de productos visibles
    const PRODUCTS_INCREMENT = 10; // Incremento de productos al mostrar más

    // Obtener productos al cargar el componente
    useEffect(() => {
        fetch('http://localhost:8000/api/productos/')
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
                setFilteredProducts(data);
                setVisibleProducts(data.slice(0, PRODUCTS_INITIAL));
                setLoading(false);
                onProductCountChange?.(data.length); // Comunicar el total de productos
            })
            .catch((error) => console.error('Error al cargar los productos:', error));
    }, [onProductCountChange]);

    // Filtrar productos según los filtros aplicados
    useEffect(() => {
        if (filters) {
            const { prices = [], categories = [], search = '' } = filters;

            const filtered = productos.filter((producto) => {
                const matchesPrice =
                    prices.length > 0
                        ? prices.some(
                              (range) =>
                                  producto.precio >= range.min &&
                                  producto.precio <= range.max
                          )
                        : true;

                const matchesCategory =
                    categories.length > 0
                        ? categories.some(
                              (category) =>
                                  producto.categoria?.nombre.toLowerCase() ===
                                  category.toLowerCase()
                          )
                        : true;

                const matchesSearch = typeof search === 'string' && search.trim()
                    ? producto.titulo.toLowerCase().includes(search.toLowerCase())
                    : true;

                return matchesPrice && matchesCategory && matchesSearch;
            });

            setFilteredProducts(filtered);
            setVisibleProducts(filtered.slice(0, PRODUCTS_INITIAL));
            setShowAll(false);
            onProductCountChange?.(filtered.length); // Comunicar el total filtrado
        } else {
            setFilteredProducts(productos);
            setVisibleProducts(productos.slice(0, PRODUCTS_INITIAL));
            onProductCountChange?.(productos.length); // Total sin filtros
        }
    }, [filters, productos, onProductCountChange]);

    // Mostrar más o menos productos
    const handleToggleShow = () => {
        if (showAll) {
            setVisibleProducts(filteredProducts.slice(0, PRODUCTS_INITIAL));
            setShowAll(false);
        } else {
            const newVisibleCount = Math.min(
                visibleProducts.length + PRODUCTS_INCREMENT,
                filteredProducts.length
            );
            setVisibleProducts(filteredProducts.slice(0, newVisibleCount));
            setShowAll(newVisibleCount === filteredProducts.length);
        }
    };

    // Limpiar un filtro específico
    const clearFilter = (filterKey) => {
        const newFilters = { ...filters, [filterKey]: [] };
        applyFilters(newFilters);
    };

    // Manejar clic en "Añadir al carrito" y abrir el modal
    const handleAddToCartClick = (producto) => {
        setModalContent({
            producto,
            title: 'Añadir al carrito',
            message: `Selecciona los detalles para "${producto.titulo}".`,
        });
        setShowModal(true);
    };

    // Manejar selección de talla
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Confirmar adición al carrito
    const handleConfirmAddToCart = () => {
        if (!selectedSize && modalContent.producto?.categoria?.nombre !== 'Accesorios') {
            alert('Por favor, selecciona una talla antes de añadir al carrito.');
            return;
        }
        const productToAdd = {
            ...modalContent.producto,
            talla: selectedSize || null,
        };
        addToCart(productToAdd);
        setShowModal(false);
        setSelectedSize(null);
    };

    // Cerrar el modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedSize(null);
    };

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    return (
        <div className="product-card-section">
            <div className="applied-filters">
                {/* Filtros aplicados */}
                {filters?.search && (
                    <li
                        className="selector_categoria"
                        onClick={() => clearFilter('search')}
                    >
                        🔍 "{filters.search}" <span className="equis">×</span>
                    </li>
                )}
                {filters?.categories?.length > 0 &&
                    filters.categories.map((category) => (
                        <li
                            key={category}
                            className="selector_categoria"
                            onClick={() =>
                                applyFilters({
                                    ...filters,
                                    categories: filters.categories.filter(
                                        (c) => c !== category
                                    ),
                                })
                            }
                        >
                            🏷️ {category} <span className="equis">×</span>
                        </li>
                    ))}
                {filters?.prices?.length > 0 &&
                    filters.prices.map((range, index) => (
                        <li
                            key={index}
                            className="selector_categoria"
                            onClick={() =>
                                applyFilters({
                                    ...filters,
                                    prices: filters.prices.filter(
                                        (r) => r !== range
                                    ),
                                })
                            }
                        >
                            💰 {`De $${range.min} a $${range.max}`}
                            <span className="equis">×</span>
                        </li>
                    ))}
            </div>

            {/* Mostrar productos */}
            {filteredProducts.length === 0 ? (
                <div className="no-products-message">
                    <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
                </div>
            ) : (
                <>
                    <ul className="product-card-grid">
                        {visibleProducts.map((producto) => (
                            <li key={producto.id} className="product-card">
                                <div className="imagen-container">
                                    <img
                                        src={`http://localhost:8000/${producto.imagen}`}
                                        alt={producto.titulo}
                                        className="product-imagen"
                                    />
                                </div>
                                <div className="product-card-title">{producto.titulo}</div>
                                <div className="product-card-info">
                                    <div className="add-termItem">
                                        <div className="tag">
                                            {producto.categoria?.nombre || 'Sin categoría'}
                                        </div>
                                    </div>
                                    <span className="product-card-price">
                                        ${producto.precio.toLocaleString('es-CO')} COP
                                    </span>
                                </div>
                                <div className="product-card-description">
                                    {producto.descripcion}
                                </div>
                                <div className="add-goodsItem__buttonContainer">
                                    <Link to={`/detalles/${producto.id}`}>
                                        <button className="product-card-button">Más detalles</button>
                                    </Link>
                                    <button
                                        className="add-cartButton js-cartBtn js-list-cartBtn"
                                        onClick={() => handleAddToCartClick(producto)}
                                    >
                                        <i className="bi bi-cart"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="add-goodsList__footer">
                        <div className="moreThemesButtonArea">
                            <button
                                type="button"
                                className="add-goodsList__more moreThemesButton"
                                onClick={handleToggleShow}
                            >
                                <span>{showAll ? 'Mostrar menos' : 'Mostrar más'}</span>
                                <span style={{ marginLeft: '7px', fontSize: '18px' }}>
                                    <i className={`bi bi-chevron-${showAll ? 'up' : 'down'}`}></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Modal */}
            {showModal && modalContent.producto && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{modalContent.title}</h3>
                        <p>{modalContent.message}</p>
                        {modalContent.producto?.categoria?.nombre !== 'Accesorios' && (
                            <div className="details-size-sectionn">
                                <p>Selecciona tu talla:</p>
                                <div className="details-size-optionss">
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            className={`details-size-botton ${
                                                selectedSize === size ? 'selected' : ''
                                            }`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button className="confirm-button" onClick={handleConfirmAddToCart}>
                            Confirmar
                        </button>
                        <button className="cancel-button" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCardComponent;
