import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditUser.css";
import Navbar from "../components/Navbar";

const EditUserComponent = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        telefono: "",
        department: "",
        city: "",
        postal_code: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successModal, setSuccessModal] = useState(false); // Para manejar el modal de éxito

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/user/profile/", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Error al obtener el perfil del usuario.");
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setError("No se pudo cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/user/profile/edit/", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el perfil.");
            }

            setSuccessModal(true); // Mostrar modal de éxito

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate("/minpage");
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setError("No se pudo actualizar la información. Intenta de nuevo.");
        }
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <>
            <Navbar initialScrolled={true} />
            {/* Breadcrumb */}
            <div className="breadcrumb-containeredit">
                <a href="/" className="breadcrumb-moreedit">Dozo</a> /
                <a href="/minpage" className="breadcrumb-moreedit"> Mi perfil</a> /
                <a href="/edituser" className="breadcrumb-moreedit"> Editar perfil</a>
            </div>
            <div className="edit-user-container">
                <h2 className="section-title">Editar información de la cuenta</h2>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    {Object.keys(userData).map((key) => (
                        key !== "role" && ( // Excluir el campo role
                            <div className="form-group" key={key}>
                                <label htmlFor={key} className="form-label">
                                    {key.replace("_", " ").toUpperCase()}:
                                </label>
                                <input
                                    type={key === "email" ? "email" : "text"}
                                    id={key}
                                    name={key}
                                    value={userData[key]}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        )
                    ))}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="save-button">
                        Guardar Cambios
                    </button>
                </form>
            </div>

            {/* Modal estilo cómico */}
            {successModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">¡Tu Información fue actualizada exitosamente!</h3>
                        <p>Serás redirigido automáticamente...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditUserComponent;
