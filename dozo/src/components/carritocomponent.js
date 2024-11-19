import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from './CartContext'; // Contexto del carrito
import '../styles/carrito.css';

const Carrito = () => {
    const { cart, removeFromCart, updateProductQuantity } = useCart(); // Acceso al contexto
    const navigate = useNavigate();
    const [aceptarTerminos, setAceptarTerminos] = useState(false); // Estado para el checkbox
    const [subtotal, setSubtotal] = useState(0); // Estado para el subtotal

    // Calcular el subtotal cuando cambie el carrito
    useEffect(() => {
        const total = cart.reduce(
            (acc, producto) => acc + producto.precio * producto.cantidad,
            0
        );
        setSubtotal(total);
    }, [cart]);

    // Manejar cambio del checkbox
    const handleCheckboxChange = (e) => {
        setAceptarTerminos(e.target.checked);
    };

    // Proceder al pago
    const handleProcederPago = () => {
        if (aceptarTerminos) {
            navigate('/pagos', { state: { cart } }); // Pasar carrito como estado
        } else {
            alert('Debe aceptar los términos para continuar.');
        }
    };

    // Si no hay productos en el carrito
    if (cart.length === 0) {
        return (
            <>
                <Navbar initialScrolled={true} />
                <div className="carrito-page">
                    <h2>No hay productos en tu carrito</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="carrito-page">
                <section className="add-sectionGeneral bgw">
                    <div className="add-l-inner">
                        <h2 className="add-sectionTitle">
                            <span className="add-sectionTitle__text-03">
                                Productos en el carrito (
                                <span className="total_cnt">{cart.length}</span> artículo
                                {cart.length > 1 ? 's' : ''})
                            </span>
                        </h2>
                    </div>
                </section>

                <div className="carrito-productos">
                    {cart.map((producto) => (
                        <div key={producto.id} className="carrito-producto">
                            <img
                                src={
                                    producto.imagen.startsWith('http')
                                        ? producto.imagen
                                        : `http://localhost:8000/${producto.imagen}`
                                }
                                alt={producto.titulo}
                                className="producto-imagen"
                            />
                            <div className="producto-detalle">
                                <div className="nombre">
                                    <h3>{producto.titulo}</h3>
                                    <button
                                        onClick={() => removeFromCart(producto.id)}
                                        className="producto-eliminar"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <p>{producto.precio.toLocaleString('es-CO')} COP</p>
                            </div>
                            <div className="producto-cantidad">
                                <button
                                    onClick={() =>
                                        producto.cantidad > 1 &&
                                        updateProductQuantity(producto.id, producto.cantidad - 1)
                                    }
                                    className="menos"
                                >
                                    -
                                </button>
                                <span>{producto.cantidad}</span>
                                <button
                                    onClick={() =>
                                        updateProductQuantity(producto.id, producto.cantidad + 1)
                                    }
                                    className="mas"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="carrito-subtotal">
                    <p>Subtotal</p>
                    <h2>$ {subtotal.toLocaleString('es-CO')}</h2>
                    <p>* Impuesto al consumo y envío incluidos</p>
                </div>

                <div className="carrito-terminos">
                    <h3 className="terminos-titulo">
                        Términos de uso y manejo de la información personal
                    </h3>
                    <div className="terminos-contenedor">
                        <p>
                            <strong>Condiciones de uso</strong>
                        </p>
                        <p>
                            Al utilizar este sitio, acepta los términos de uso y manejo de su
                            información personal.
                        </p>
                    </div>
                    <div className="terminos-checkbox">
                        <input
                            type="checkbox"
                            id="aceptar-terminos"
                            checked={aceptarTerminos}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="aceptar-terminos"> Aceptar</label>
                    </div>
                    <button
                        className={`proceder-pago ${aceptarTerminos ? 'activo' : ''}`}
                        disabled={!aceptarTerminos}
                        onClick={handleProcederPago}
                    >
                        Ir al procedimiento de pago
                    </button>
                </div>
            </div>
        </>
    );
};

export default Carrito;
