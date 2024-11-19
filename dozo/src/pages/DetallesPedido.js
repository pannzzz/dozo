import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/detallespedido.css';
import Navbar from '../components/Navbar';
import FooterComponent from '../components/FooterComponent';

const DetallesPedido = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/pedidos/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPedido(response.data);
            } catch (err) {
                console.error('Error al obtener el pedido:', err);
                setError('No se pudo cargar la información del pedido.');
            }
        };

        fetchPedido();
    }, [id]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!pedido) {
        return <p className="loading-message">Cargando detalles del pedido...</p>;
    }

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="breadcrumb-containerdetallespedidos">
                    <a href="/" className="breadcrumb-more">Dozo</a> / 
                    <a href="/mispedidos" className="breadcrumb-more">Mis pedidos</a> / Detalles pedido
                </div>
            <div className="pedido-page">

                <h1 className="pedido-title">Detalles del Pedido</h1>
                <p className="pedido-subtitle">Productos en el carrito ({pedido.productos.length} artículo{pedido.productos.length > 1 ? 's' : ''})</p>

                <div className="pedido-productos">
                    {pedido.productos.map((productoItem, index) => (
                        <div key={index} className="pedido-producto">
                            <img
                                src={`http://localhost:8000/${productoItem.producto.imagen}`}
                                alt={productoItem.producto.titulo}
                                className="pedido-producto-imagen"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/100x100'}
                            />
                            <div className="pedido-producto-info">
                                <p className="producto-titulo">{productoItem.producto.titulo}</p>
                                <p className="producto-precio">{productoItem.precio_unidad.toLocaleString('es-CO')} COP</p>
                            </div>
                            <div className="pedido-producto-cantidad">
                                <span className="cantidad-texto">Cantidad: {productoItem.cantidad}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pedido-total">
                    <p className="total-texto">Subtotal</p>
                    <p className="total-precio">{pedido.total.toLocaleString('es-CO')} COP</p>
                    <p className="total-nota">* Impuesto al consumo y envío incluidos</p>
                </div>
            </div>

            <FooterComponent />
        </>
    );
};

export default DetallesPedido;
