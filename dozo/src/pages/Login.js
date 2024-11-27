import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';
import FooterComponent from '../components/FooterComponent';

axios.defaults.withCredentials = true;
const LOGIN_URL = 'http://localhost:8000/login/';
const RESET_PASSWORD_URL = 'http://localhost:8000/api/reset-password/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [resetEmail, setResetEmail] = useState(''); // Correo para restablecer contraseña
    const [resetMessage, setResetMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirección

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setShowError(true);
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        try {
            const csrftoken = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const response = await axios.post(
                LOGIN_URL,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                }
            );

            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            setShowError(true);
            setErrorMessage(
                error.response?.data?.error || 'Error al iniciar sesión. Inténtalo de nuevo.'
            );
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(RESET_PASSWORD_URL, { email: resetEmail });
            setResetMessage(response.data.message || 'Se ha enviado un enlace a tu correo.');
        } catch (error) {
            setResetMessage(
                error.response?.data?.error ||
                    'Hubo un error al enviar el correo. Verifica tu dirección de correo.'
            );
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
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
                            <p
                                className="forgot-password"
                                onClick={() => setShowModal(true)}
                            >
                                ¿Olvidaste tu contraseña?
                            </p>
                        </form>
                    </div>
                    <div className="separator"></div>
                    <div className="new-user-box">
                        <h3>Para quienes visitan por primera vez</h3>
                        <p>
                            ¡Aquellos que se registren como <br />
                            miembros les damos la bienvenida <br />
                            a todos lo que vayan <br />
                            a ser y serán <br />
                            parte de Dozo!
                        </p>
                        <button className="new-user-button" onClick={handleRegisterRedirect}>
                            Registro de nuevos miembros
                        </button>
                    </div>
                </div>
            </div>
            <FooterComponent />

            {/* Modal para restablecer contraseña */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Restablecer contraseña</h3>
                        <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleForgotPassword}>
                                Enviar enlace
                            </button>
                            <button className="cancel-button" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                        {resetMessage && <p className="reset-message">{resetMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
