import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar Bootstrap Icons
import '../styles/SideMenu.css';

const SideMenu = ({ closeMenu }) => {
    const [user, setUser] = useState(null); // Estado para el usuario autenticado

    useEffect(() => {
        // Obtener usuario desde localStorage
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const handleLogout = () => {
        // Eliminar datos del usuario de localStorage
        localStorage.clear();
        setUser(null); // Actualizar estado del usuario
        closeMenu(); // Cerrar el menú lateral
        window.location.reload(); // Opcional, para recargar la página
    };

    return (
        <>
            <div className="menu-overlay" onClick={closeMenu}></div>
            <div className="add-globalMenu__inner">
                <div className="side-menu">
                    <button className="close-button" onClick={closeMenu}>✕</button>
                    <div className="add-globalMenu__contents">
                        <div>
                            <ul className="add-globalMenu__list01">
                                <li className="unu">
                                    <div className="add-globalMenu__list__inner">
                                        <a href="/findgift" className="add-globalMenu__list01__link">
                                            <img
                                                src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-search.svg"
                                                alt="Buscar icono" />
                                            <span> Encuentra un estilo</span>
                                            <i className="bi bi-chevron-right arrow"></i>
                                        </a>
                                    </div>
                                </li>

                                <li className="unu2">
                                    <a href="/about" className="add-globalMenu__list01__link">
                                        <img
                                            src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-question.svg"
                                            alt="Ícono de pregunta"
                                        />
                                        <span>¿Qué es el dōzo?</span>
                                        <i className="bi bi-chevron-right arrow"></i>
                                    </a>
                                </li>

                                <li className="unu3">
                                    <a href="/howto" className="add-globalMenu__list01__link">
                                        <img
                                            src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-magazine.svg"
                                            alt="Ícono de regalo" className="imagen-regalo"
                                        />
                                        <span>Cómo usar dozo</span><i className="bi bi-chevron-right arrow"></i>
                                    </a>
                                </li>

                                <li className="unu3">
                                    <a href="/minpage" className="add-globalMenu__list01__link">
                                        <img
                                            src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-brush.svg"
                                            alt="Ícono de regalo" className="imagen-regalo"
                                        />
                                        <span>Mi perfil</span><i className="bi bi-chevron-right arrow"></i>
                                    </a>
                                </li>

                                {user && ( // Solo mostrar si el usuario ha iniciado sesión
                                    <div>
                                        <li className="unu3">
                                            <a href="/mispedidos" className="add-globalMenu__list01__link">
                                                <img
                                                    src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-present.png"
                                                    alt="Ícono de pedidos" className="imagen-regalo"
                                                />
                                                <span>Tus pedidos</span><i className="bi bi-chevron-right arrow"></i>
                                            </a>
                                        </li>

                                        {user.email === 'panzzz956@gmail.com' && ( // Mostrar solo si el usuario es administrador
                                            <li className="unu4">
                                                <a href="http://127.0.0.1:8000/productos/nuevo/" className="add-globalMenu__list01__link">
                                                    <img
                                                        src="https://auth.dozo-gift.com/front/v1_1/images/common/icon-magazine.svg"
                                                        alt="Ícono de registro de productos" className="imagen-regalo"
                                                    />
                                                    <span>Modo Administrador</span><i className="bi bi-chevron-right arrow"></i>
                                                </a>
                                            </li>
                                        )}
                                    </div>
                                )}
                            </ul>
                        </div>
                        <ul className="secondary-menu">
                            {user ? (
                                <>
                                    <li><span className="user-info">Hola, {user.username}</span></li>
                                    <li><button className="logout-button" onClick={handleLogout}>Cerrar sesión</button></li>
                                </>
                            ) : (
                                <>
                                    <li><a href="/login">Iniciar sesión</a></li>
                                    <li><a href="/register">Registro de nuevos miembros</a></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideMenu;