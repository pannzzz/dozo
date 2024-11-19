import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';
import FooterComponent from '../components/FooterComponent';

axios.defaults.withCredentials = true;
const URL = 'http://localhost:8000/login/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirección

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!email || !password) {
            setShowError(true);
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Obtener CSRF token (asegúrate de que Django lo incluya en las cookies)
            const csrftoken = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];

            // Enviar solicitud al backend
            const response = await axios.post(
                URL,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                }
            );

            // Guardar información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirigir al usuario en caso de éxito
            console.log('Inicio de sesión exitoso:', response.data);
            navigate('/'); // Cambia la ruta por la deseada
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setShowError(true);
            setErrorMessage(
                error.response?.data?.error || 'Error al iniciar sesión. Inténtalo de nuevo.'
            );
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="login-container">
                <div className="breadcrumb">
                    <a href="/" className="breadcrumb-home">Dozo</a> / Iniciar sesión
                </div>

                <div className="scaled-content">
                    <div className="login-box">
                        <h2>Iniciar sesión</h2>
                        {showError && (
                            <div className="error-message">
                                <strong>Error:</strong> {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Dirección de correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="login-button">Iniciar sesión</button>
                            <p className="forgot-password">¿Olvidaste tu contraseña?</p>
                        </form>
                    </div>
                    <div className="separator"></div>
                    <div className="new-user-box">
                        <h3>Para quienes visitan por primera vez</h3>
                        <p>
                            ¡Aquellos que se registren como<br />
                            miembros en LINE recibirán<br />
                            un cupón de descuento de 500 <br />
                            yenes que se puede usar <br />
                            de inmediato!
                        </p>
                        <button className="new-user-button" onClick={handleRegisterRedirect}>
                            Registro de nuevos miembros
                        </button>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default Login;
