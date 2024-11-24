import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/Formulario.css';

const Formulario = () => {
    const navigate = useNavigate(); // Instanciar useNavigate
    const [formData, setFormData] = useState({
        username: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        nombre: '',
        apellido: '',
        departamento: '',
        ciudad: '',
        direccion: '',
        codigoPostal: ''
    });

    const [errors, setErrors] = useState({});
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    // Cargar la lista de departamentos
    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/Department')
            .then(response => response.json())
            .then(data => {
                setDepartamentos(data || []);
            })
            .catch(error => {
                console.error('Error al obtener departamentos:', error);
                setDepartamentos([]);
            });
    }, []);

    // Cargar las ciudades del departamento seleccionado
    useEffect(() => {
        if (formData.departamento) {
            const departamentoSeleccionado = departamentos.find(
                depto => depto.name === formData.departamento
            );
            if (departamentoSeleccionado && departamentoSeleccionado.id) {
                fetch(`https://api-colombia.com/api/v1/Department/${departamentoSeleccionado.id}/cities`)
                    .then(response => response.json())
                    .then(data => {
                        setCiudades(data || []);
                    })
                    .catch(error => {
                        console.error('Error al obtener ciudades:', error);
                        setCiudades([]);
                    });
            } else {
                setCiudades([]);
            }
        } else {
            setCiudades([]);
        }
    }, [formData.departamento, departamentos]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = "El nombre de usuario es obligatorio";

        if (!formData.correo) newErrors.correo = "El correo es obligatorio";
        else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "Ingrese un correo válido";

        if (!formData.contraseña) newErrors.contraseña = "La contraseña es obligatoria";
        else if (formData.contraseña.length < 8) newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres";

        if (formData.contraseña !== formData.confirmarContraseña) {
            newErrors.confirmarContraseña = "Las contraseñas no coinciden";
        }

        if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";

        if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio";

        if (!formData.departamento) newErrors.departamento = "El departamento es obligatorio";

        if (!formData.ciudad) newErrors.ciudad = "La ciudad es obligatoria";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                username: formData.username, // Nuevo campo de username
                email: formData.correo,
                password: formData.contraseña,
                first_name: formData.nombre,
                last_name: formData.apellido,
                telefono: formData.telefono, // Nuevo campo de telefono
                department: formData.departamento,
                city: formData.ciudad,
                address: formData.direccion,
                postal_code: formData.codigoPostal,
                role: 'user',
            };

            fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (response.ok) {
                        alert('Usuario registrado exitosamente');
                        setFormData({
                            username: '',
                            correo: '',
                            contraseña: '',
                            confirmarContraseña: '',
                            nombre: '',
                            apellido: '',
                            telefono:  '',
                            departamento: '',
                            ciudad: '',
                            direccion: '',
                            codigoPostal: '',
                        });
                        navigate('/'); // Redirigir a la raíz
                    } else {
                        return response.json().then((data) => {
                            setErrors(data);
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error al registrar usuario:', error);
                });
        }
    };

    return (
        <div className="con_form">
            <form onSubmit={handleSubmit} className="box_form">
                <div className="item">
                    <label className="caption">Nombre de Usuario*</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                <div className="item">
                    <label className="caption">Correo electrónico*</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.correo && <p className="error-message">{errors.correo}</p>}
                </div>
                <div className="item">
                    <label className="caption">Contraseña*</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
                </div>
                <div className="item">
                    <label className="caption">Confirmar Contraseña*</label>
                    <input
                        type="password"
                        name="confirmarContraseña"
                        value={formData.confirmarContraseña}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.confirmarContraseña && <p className="error-message">{errors.confirmarContraseña}</p>}
                </div>
                <div className="item">
                    <label className="caption">Nombre*</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.nombre && <p className="error-message">{errors.nombre}</p>}
                </div>
                <div className="item">
                    <label className="caption">Apellido*</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.apellido && <p className="error-message">{errors.apellido}</p>}
                </div>
                <div className="item">
                    <label className="caption">Telefono*</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="frm"
                    />
                    {errors.apellido && <p className="error-message">{errors.apellido}</p>}
                </div>
                <div className="item">
                    <label className="caption">Departamento*</label>
                    <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        className="frm"
                    >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map(depto => (
                            <option key={depto.id} value={depto.name}>
                                {depto.name}
                            </option>
                        ))}
                    </select>
                    {errors.departamento && <p className="error-message">{errors.departamento}</p>}
                </div>
                <div className="item">
                    <label className="caption">Ciudad*</label>
                    <select
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="frm"
                        disabled={!formData.departamento}
                    >
                        <option value="">Seleccione una ciudad</option>
                        {ciudades.map(ciudad => (
                            <option key={ciudad.id} value={ciudad.name}>
                                {ciudad.name}
                            </option>
                        ))}
                    </select>
                    {errors.ciudad && <p className="error-message">{errors.ciudad}</p>}
                </div>
                <div className="item">
                    <label className="caption">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="frm"
                    />
                </div>
                <div className="item">
                    <label className="caption">Código Postal</label>
                    <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                        className="frm"
                    />
                </div>
                <div className="box_action">
                    <button type="submit" className="btn_submit">Registrarse</button>
                </div>
                </form>
        </div>
    );
};

export default Formulario;
