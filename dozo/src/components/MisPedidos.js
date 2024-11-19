import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Mispedidos.css'; // Reutilizamos los estilos
import FooterComponent from '../components/FooterComponent';


const MisPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/pedidos/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPedidos(response.data.pedidos);
            } catch (err) {
                console.error('Error al obtener los pedidos:', err);
                setError('Error al obtener los pedidos. Por favor, inténtelo de nuevo más tarde.');
            }
        };

        fetchPedidos();
    }, []);

    const handleMoreDetails = (id) => {
        console.log('Redirigiendo a detalles del pedido con ID:', id);
        navigate(`/detalles-pedido/${id}`);
    };

    if (error) {
        return (
            <>
                <Navbar initialScrolled={true} />
                <div className="carrito-page1">
                    <h2 className="error">{error}</h2>
                </div>
            </>
        );
    }

    if (pedidos.length === 0) {
        return (
            <>
                <Navbar initialScrolled={true} />
                <div className="carrito-page1">
                    <h2>No has realizado ningún pedido.</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="carrito-page1">
                <div className="breadcrumb-containermispedidos">
                    <a href="/" className="breadcrumb-more">Dozo</a> / 
                    <a href="/findgift" className="breadcrumb-more">Search</a> / Mis Pedidos
                </div>

                <section className="add-sectionGeneralzzz">
                    <div className="add-l-innerzzz">
                        <h2 className="add-sectionTitlezzz">
                            <span className="add-sectionTitle__text-03zzz">
                                Mis Pedidos ({pedidos.length} pedido{pedidos.length > 1 ? 's' : ''})
                            </span>
                        </h2>
                    </div>
                </section>

                <div className="carrito-productoszzz">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="carrito-productozzz">
                            <img
                                src={`https://i.pinimg.com/736x/44/82/a9/4482a9b72bed00a223e97405a8ce91e2.jpg`} // Placeholder o URL real
                                alt="Imagen del producto"
                                className="producto-imagenzzz"
                            />
                            <div className="producto-detallezzz">
                                <div className="nombrezzz">
                                    <h3>Pedido ID: {pedido.id}</h3>
                                    <p className="estado">
                                        <strong>Estado:</strong> {pedido.estado}
                                    </p>
                                </div>
                                <p>
                                    <strong>Fecha:</strong> {pedido.fecha_venta}
                                </p>
                                <p>
                                    <strong>Total:</strong> {pedido.total.toLocaleString('es-CO')} COP
                                </p>
                            </div>
                            <div className="producto-cantidadzzz">
                                <span>{pedido.productos.length} producto{pedido.productos.length > 1 ? 's' : ''}</span>
                            </div>
                            <div className="producto-botonzzz">
                                <button
                                    className="detalle-buttonzzz"
                                    onClick={() => handleMoreDetails(pedido.id)}
                                >
                                    Más Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FooterComponent />

        </>
    );
};

export default MisPedidos;