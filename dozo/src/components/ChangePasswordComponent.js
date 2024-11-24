import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChangePassword.css";

const ChangePasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Campo adicional
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

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

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

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setError("No se pudo cambiar la contraseña. Intenta de nuevo.");
        }
    };

    const handleCancel = () => {
        navigate("/"); // Redirige al usuario al inicio o donde desees
    };

    return (
        <div className="change-password-container">
            <h2 className="manga-header">¡Cambia tu Contraseña!</h2>

            {step === 1 && (
                <form onSubmit={handleVerifyCurrentPassword} className="form-container">
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="Contraseña Actual"
                        className="manga-input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-buttons">
                        <button type="submit" className="manga-button">
                            Verificar
                        </button>
                        <button type="button" className="manga-button-cancel" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleChangePassword} className="form-container">
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Nueva Contraseña"
                        className="manga-input"
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repite la Nueva Contraseña"
                        className="manga-input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-buttons">
                        <button type="submit" className="manga-button">
                            ¡Cambiar Contraseña!
                        </button>
                    </div>
                </form>
            )}

            {successModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>¡Éxito!</h3>
                        <p>¡Tu contraseña ha sido cambiada exitosamente!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePasswordComponent;
