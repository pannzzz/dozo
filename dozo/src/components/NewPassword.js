import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FooterComponent from '../components/FooterComponent';
import '../styles/NewPassword.css';

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams(); // Obtener el ID del usuario desde la URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Enviar la nueva contraseña al backend
            const response = await axios.post(
                `http://localhost:8000/api/reset-password/${userId}/`,
                { new_password: newPassword }
            );
            

            setSuccessMessage(response.data.message || '¡Contraseña actualizada exitosamente!');
            setTimeout(() => {
                navigate('/login'); // Redirigir al inicio de sesión
            }, 3000); // Esperar 3 segundos antes de redirigir
        } catch (error) {
            setError(
                error.response?.data?.error ||
                'Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.'
            );
        }
    };

    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="new-password-container">
                <h2>Restablecer Contraseña</h2>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleSubmit} className="password-form">
                    <div className="form-group">
                        <label htmlFor="new-password">Nueva Contraseña</label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Nueva Contraseña</label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Actualizar Contraseña
                    </button>
                </form>
            </div>
            <FooterComponent />
        </>
    );
};

export default NewPassword;
