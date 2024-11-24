import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChangePassword.css";

const ChangePasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Verificar contraseña actual, 2: Cambiar contraseña
    const [error, setError] = useState("");
    const [successModal, setSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleVerifyCurrentPassword = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/verify-current-password/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_password: currentPassword }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Contraseña actual incorrecta.");
            }

            setStep(2);
        } catch (error) {
            setError("La contraseña actual es incorrecta. Intenta de nuevo.");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/change-password/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ new_password: newPassword }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Error al cambiar la contraseña.");
            }

            setSuccessModal(true);

            // Espera 2 segundos para mostrar el modal y luego cerrar todas las sesiones
            setTimeout(async () => {
                try {
                    const logoutAllResponse = await fetch("http://localhost:8000/api/logout-all/", {
                        method: "POST",
                        credentials: "include",
                    });

                    if (!logoutAllResponse.ok) {
                        throw new Error("Error al cerrar todas las sesiones.");
                    }

                    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
                } catch (logoutError) {
                    console.error("Error al cerrar sesiones:", logoutError);
                    navigate("/login"); // Redirige aunque falle el cierre de sesiones
                }
            }, 2000);
        } catch (error) {
            setError("No se pudo cambiar la contraseña. Intenta de nuevo.");
        }
    };

    return (
        <div className="change-password-container manga-style">
            <h2 className="manga-header">¡Cambia tu Contraseña!</h2>

            {step === 1 && (
                <form onSubmit={handleVerifyCurrentPassword} className="form-container">
                    <label htmlFor="currentPassword">Contraseña Actual:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="Ingresa tu contraseña actual"
                        className="manga-input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="manga-button">
                        Verificar
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleChangePassword} className="form-container">
                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Ingresa tu nueva contraseña"
                        className="manga-input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="manga-button">
                        ¡Cambiar Contraseña!
                    </button>
                </form>
            )}

            {successModal && (
                <div className="success-modal manga-modal">
                    <div className="modal-content">
                        <h3 className="manga-success-title">¡Éxito!</h3>
                        <p className="manga-success-message">
                            ¡Tu contraseña ha sido cambiada exitosamente!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePasswordComponent;
