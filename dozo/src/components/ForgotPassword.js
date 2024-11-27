import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FooterComponent from '../components/FooterComponent';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar solicitud al backend para enviar correo
            const response = await axios.post('http://localhost:8000/api/reset-password/', { email });

            // Mostrar mensaje de éxito y redirigir al usuario
            setSuccessMessage(response.data.message || 'Correo enviado con éxito.');
            setTimeout(() => {
                // Redirige al componente para establecer nueva contraseña
                navigate(`/reset-password/${response.data.user_id}`);
            }, 3000); // Redirigir después de 3 segundos
        } catch (error) {
            setError(
                error.response?.data?.error || 
                'Hubo un problema al enviar el correo. Inténtalo de nuevo.'
            );
        }
    };

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="forgot-password-container">
                <h2>Restablecer Contraseña</h2>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleSubmit} className="password-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Enviar Correo
                    </button>
                </form>
            </div>
            <FooterComponent />
        </>
    );
};

export default ForgotPassword;
