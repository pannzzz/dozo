import React, { useEffect, useState } from "react";
import "../styles/MainPage.css";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";

const MainPage = () => {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/user/profile/", {
                    credentials: "include", // Incluir cookies para mantener la sesión
                });
                if (!response.ok) {
                    throw new Error("Error al obtener el perfil del usuario.");
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!user) {
        return <p>Error al cargar el perfil del usuario.</p>;
    }

    return (
        <>
            <Navbar initialScrolled={true} />
            <main className="main-content">
                {/* Breadcrumb */}
                <div className="breadcrumb-containermain">
                    <a href="/" className="breadcrumb-moremain">Dozo</a> /
                    <a href="/findgift" className="breadcrumb-moremain"> Mi página</a>
                </div>

                {/* Main Section */}
                <section className="add-sectionGeneral narrow">
                    <div className="add-l-inner bgw box_mv contact">
                        <h2 className="add-sectionTitle aos-init add-is-active">
                            <span className="add-sectionTitle__text-03">Mi página</span>
                        </h2>
                    </div>
                </section>

                {/* Wrapper */}
                <div className="wrp_mypage">
                    {/* Account Information */}
                    <section className="con_mypage_block">
                        <h2 className="st">
                            <span className="txt">Información de la cuenta</span>
                            <span className="icon"></span>
                        </h2>

                        <div className="box_mypage">
                            <div className="box_infos">
                                <form className="user-profile-form">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Nombre*</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={user.first_name || ""}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Apellido*</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={user.last_name || ""}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="department">Departamento*</label>
                                        <input
                                            type="text"
                                            id="department"
                                            value={user.department || "Seleccione un departamento"}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">Ciudad*</label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={user.city || "Seleccione una ciudad"}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Dirección</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={user.address || ""}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postalCode">Código Postal</label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            value={user.postal_code || ""}
                                            disabled
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* Favorites */}
                    <section className="con_mypage_block">
                        <h2 className="st">
                            <span className="txt">Favorito</span>
                            <span className="icon"></span>
                        </h2>
                        <div className="box_mypage1">
                            <div className="box_favorite">
                                <p className="btn3">
                                    <a href="/a/p/customer/favorites" className="btn_black_border1 hoverBtn">
                                        Revisa tus prendas favoritas
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Order History */}
                    <section className="con_mypage_block4">
                        <h2 className="st">
                            <span className="txt">Historial de pedidos</span>
                            <span className="icon"></span>
                        </h2>
                        <div className="box_mypage4">
                            <div className="box_his">
                                <div className="box_table">
                                    <p>Todavía no he finalizado mi pedido.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Logout */}
                    <div className="box_btn5">
                        <p className="btn5">
                            <a href="/account/logout">Cerrar sesión</a>
                        </p>
                        <p className="btn6">
                            <a href="/a/p/customer/delete">Haga clic aquí para</a> darse de baja.
                        </p>
                    </div>
                </div>
            </main>
            <FooterComponent />
        </>
    );
};

export default MainPage;
