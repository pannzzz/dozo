import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pagos.css';

const Pagos = () => {
    const { state } = useLocation(); // Obtener estado pasado desde la navegación
    const navigate = useNavigate(); // Instancia de useNavigate
    const cart = state?.cart || []; // Obtener el carrito o un array vacío si no existe

    const [formData, setFormData] = useState({
        email: '',
        telefono: '',
        apellido: '',
        nombre: '',
        codigoPostal: '',
        ciudad: '',
        direccion: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true); // Estado para la carga
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/profile/', {
                    withCredentials: true, // Incluir cookies para la autenticación
                });
                setFormData({
                    email: response.data.email || '',
                    telefono: response.data.telefono || '',
                    apellido: response.data.last_name || '',
                    nombre: response.data.first_name || '',
                    codigoPostal: response.data.postal_code || '',
                    ciudad: response.data.city || '',
                    direccion: response.data.address || '',
                });
            } catch (error) {
                console.error('Error al cargar el perfil:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserProfile();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El formato del correo electrónico es inválido.';
        }

        if (!formData.telefono) {
            newErrors.telefono = 'El número de teléfono es obligatorio.';
        } else if (!/^\d{10,15}$/.test(formData.telefono)) {
            newErrors.telefono = 'El número de teléfono debe tener entre 10 y 15 dígitos.';
        }

        if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio.';
        if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.';
        if (!formData.codigoPostal) newErrors.codigoPostal = 'El código postal es obligatorio.';
        if (!formData.ciudad) newErrors.ciudad = 'La ciudad es obligatoria.';
        if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Por favor, corrija los errores antes de continuar.');
            return;
        }

        const payload = {
            user: formData,
            cart,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/ventas/', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Pedido enviado correctamente:', response.data);
            setShowModal(true); // Mostrar el modal
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
            alert('Ocurrió un error al confirmar el pedido. Inténtelo de nuevo.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/mispedidos'); // Redirigir al cerrar el modal
    };

    if (loading) {
        return <div className="pagos-page"><p>Cargando datos del usuario...</p></div>;
    }

    const total = cart.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    return (
        <div className="pagos-page">
            <div className="pagos-container">
                <section className="pago-rapido">
                    <h3>Pago contra entrega</h3>
                    <p>Por favor, complete los datos de entrega para proceder con el pedido.</p>
                </section>

                <section className="contacto">
                    <h3>Contacto</h3>
                    <input
                        type="email"
                        name="email"
                        placeholder="Dirección de correo electrónico"
                        className="input-contacto"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Número de teléfono"
                        className="input-telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    {errors.telefono && <span className="error">{errors.telefono}</span>}
                </section>

                <section className="direccion-facturacion">
                    <h3>Dirección de entrega</h3>
                    <form className="form-direccion" onSubmit={handleSubmit}>
                        <div className="fila">
                            <select className="select-pais">
                                <option value="colombia">Colombia</option>
                            </select>
                        </div>
                        <div className="fila">
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                className="input-apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                            {errors.apellido && <span className="error">{errors.apellido}</span>}
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                className="input-nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && <span className="error">{errors.nombre}</span>}
                        </div>
                        <div className="fila">
                            <input
                                type="text"
                                name="codigoPostal"
                                placeholder="Código postal"
                                className="input-codigo-postal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
                            />
                            {errors.codigoPostal && <span className="error">{errors.codigoPostal}</span>}
                        </div>
                        <div className="fila">
                            <input
                                type="text"
                                name="ciudad"
                                placeholder="Ciudad"
                                className="input-ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                            />
                            {errors.ciudad && <span className="error">{errors.ciudad}</span>}
                        </div>
                        <div className="fila">
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Dirección"
                                className="input-direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                            {errors.direccion && <span className="error">{errors.direccion}</span>}
                        </div>
                        <button type="submit" className="boton-pagar">Confirmar pedido</button>
                    </form>
                </section>
            </div>

            <aside className="resumen-pedido">
                {cart.map((producto) => (
                    <div key={producto.id} className="producto-resumen">
                        <img
                            src={
                                producto.imagen.startsWith('http')
                                    ? producto.imagen
                                    : `http://localhost:8000/${producto.imagen}`
                            }
                            alt={producto.titulo}
                            className="imagen-producto"
                        />
                        <div className="detalles-producto">
                            <p>{producto.titulo}</p>
                            <p>{producto.precio.toLocaleString('es-CO')} COP</p>
                        </div>
                    </div>
                ))}
                <div className="suma-total">
                    <p>Total</p>
                    <h3>$ {total.toLocaleString('es-CO')}</h3>
                </div>
            </aside>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
            <h2>¡Pedido Confirmado!</h2>
            <p>Tu pedido ha sido confirmado exitosamente.</p>
            <button className="modal-close-button" onClick={handleModalClose}>
                Ir a Mis Pedidos
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default Pagos;
