import { useNavigate } from 'react-router-dom'; // Importar el hook para la navegación
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MoreDetails.css';
import Navbar from '../components/Navbar';
import FooterComponent from '../components/FooterComponent';
import { useCart } from './CartContext'; // Importar el contexto del carrito

const MoreDetails = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Inicializar el hook de navegación

    useEffect(() => {
        fetch(`http://localhost:8000/api/productos/${id}/`)
            .then((response) => response.json())
            .then((data) => setProducto(data))
            .catch((error) => console.error('Error al cargar el producto:', error));
    }, [id]);

    const handleSizeSelect = (size) => setSelectedSize(size);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 5) setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setModalMessage('Por favor, selecciona una talla antes de añadir al carrito.');
            setShowModal(true);
            return;
        }
        const productToAdd = {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: selectedSize,
            cantidad: quantity,
        };
        addToCart(productToAdd);
        setModalMessage('Tu producto se añadió al carrito.');
        setShowModal(true);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            setModalMessage('Por favor, selecciona una talla antes de continuar con la compra.');
            setShowModal(true);
            return;
        }
        const productToBuy = {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: selectedSize,
            cantidad: quantity,
        };
        navigate('/pagos', { state: { cart: [productToBuy] } }); // Navegar a la página de pagos con el producto
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
    };

    if (!producto) return <p>Cargando detalles del producto...</p>;

    const imageUrl = producto.imagen.startsWith('http')
        ? producto.imagen
        : `http://localhost:8000/media/${producto.imagen}`;

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="breadcrumb-container">
                <a href="/" className="breadcrumb-more">Dozo</a> / 
                <a href="/findgift" className="breadcrumb-more"> Search</a> / {producto.titulo}
            </div>

            <div className="details-container">
                <div className="details-image-section">
                    <img 
                        src={imageUrl} 
                        alt={producto.titulo} 
                        className="product-imagen" 
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/500x500')} 
                    />
                </div>

                <div className="details-info-section">
                    <h1 className="details-title">{producto.titulo}</h1>
                    <p className="details-price">${producto.precio} COP<span className="details-tax-info">Impuesto al consumo y envío incluidos</span></p>

                    <div className="details-size-section">
                        <p className="details-size-title">Selecciona tu talla:</p>
                        <div className="details-size-options">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className={`details-size-button ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="details-quantity-section">
                        <p className="details-quantity-title">Selecciona la cantidad:</p>
                        <div className="details-quantity-controls">
                            <button
                                className="details-quantity-button"
                                onClick={() => handleQuantityChange(quantity - 1)}
                            >
                                -
                            </button>
                            <span className="details-quantity-display">{quantity}</span>
                            <button
                                className="details-quantity-button"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="details-add-to-cart" onClick={handleAddToCart}>
                        <i className="bi bi-cart"></i> Añadir a la cesta
                    </button>

                    <button className="details-secondary-button" onClick={handleBuyNow}>
                        <i className="bi bi-bag"></i> Comprar ahora
                    </button>

                    <hr className="details-divider" />
                    <div className="details-description">
                        <p>{producto.descripcion}</p>
                    </div>
                </div>
            </div>

            <FooterComponent />

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={closeModal} className="modal-close-button">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MoreDetails;
