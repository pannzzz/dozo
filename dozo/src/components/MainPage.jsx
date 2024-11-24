import React, { useEffect, useState } from "react";
import "../styles/MainPage.css";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
import pedidosImage from "../assets/pedidos.jpg";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
    const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [loadingOrders, setLoadingOrders] = useState(true); // Estado para manejar la carga de pedidos
    const navigate = useNavigate(); // Hook para redirigir a otras rutas

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

        const fetchUserOrders = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/user/orders/", {
                    credentials: "include", // Incluir cookies para mantener la sesión
                });
                if (!response.ok) {
                    throw new Error("Error al obtener el historial de pedidos.");
                }
                const data = await response.json();
                setOrders(data.pedidos || []);
            } catch (error) {
                console.error("Error al cargar los pedidos:", error);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchUserProfile();
        fetchUserOrders();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!user) {
        return <p>Error al cargar el perfil del usuario.</p>;
    }

    const handleMoreDetails = (id) => {
        navigate(`/detalles-pedido/${id}`);
    };

    const handleLogout = () => {
        // Eliminar datos del usuario de localStorage
        localStorage.clear();
        setUser(null); // Actualizar estado del usuario
        window.location.reload(); // Opcional, para recargar la página
    };

    return (
        <>
            <Navbar initialScrolled={true} />
            <main className="main-content">
                {/* Breadcrumb */}
                <div className="breadcrumb-containermain">
                    <a href="/" className="breadcrumb-moremain">Dozo</a> /
                    <a href="/minpage" className="breadcrumb-moremain"> Mi página</a>
                </div>

                {/* Main Section */}
                <section className="add-sectionGeneral narrow">
                    <div className="add-l-inner bgw box_mv contact">
                        <h2 className="add-sectionTitle aos-init add-is-active">
                        <span className="add-sectionTitle__text-02">
                <svg
                    className="add-js-svgTitle"
                    width="237.25"
                    height="49.450001"
                    viewBox="0 0 237.25 49.45"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    id="icon_mypage_m01"
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="M 7.0507812,0 C 3.1007892,0 0,1.1503986 0,5.1503906 V 38.300781 c 0,3.599994 1.9000072,5.09961 5.5,5.09961 5.29999,0 5.349609,-3.849612 5.349609,-5.09961 V 22.400391 L 14.25,39.050781 c 0.15,0.849998 1.200791,4.34961 6.050781,4.34961 3.199994,0 5.500002,-1.749614 6,-4.34961 l 3.34961,-16.65039 c 0.299998,1.449996 0.848836,4.048828 5.548828,4.048828 5.349988,0 5.351562,-3.999612 5.351562,-5.09961 V 5.1503906 C 40.550781,0.80039934 36.949603,0 33.349609,0 c -6.399986,0 -7.15,2.1992273 -8,6.4492188 L 20.25,31.449219 15.150391,6.4492188 C 14.250393,2.0992275 13.500769,0 7.0507812,0 Z M 29.650391,25.25 v 13.050781 c 0,3.649994 2.050006,5.09961 5.5,5.09961 5.349988,0 5.40039,-3.849612 5.40039,-5.09961 V 25.25 c -0.949998,1.149998 -2.000006,2.400391 -5.5,2.400391 -3.349992,0 -4.550392,-1.400393 -5.40039,-2.400391 z"
                    ></path>
                    <path
                    id="icon_mypage_y01"
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="m 52.099609,10.5 c -2.699994,0 -6.048828,2.050395 -6.048828,4.900391 a 5.894,5.894 0 0 0 0.5,2.349609 l 8.09961,15.300781 A 4.454,4.454 0 0 0 58.5,35.599609 c 2.649994,0 5.599609,-2.050004 5.599609,-4.75 A 5.543,5.543 0 0 0 63.550781,28.5 L 55.900391,13.050781 A 4.6,4.6 0 0 0 52.099609,10.5 Z M 71.25,10.5 a 4.634,4.634 0 0 0 -4.550781,3.300781 L 62.5,23.699219 64.650391,28 a 8.826,8.826 0 0 1 0.65039,3.150391 c 0,2.549994 -3.100006,5.65039 -6.75,5.65039 a 4.75,4.75 0 0 1 -1.451172,-0.201172 l -0.40039,1 c -0.949998,2.349996 -1.800002,2.600002 -3,2.75 -2.099996,0.2 -4.34961,0.45118 -4.34961,4.201172 0,4.89999 4.400393,4.898438 5.650391,4.898438 6.849986,0 8.649613,-3.949227 10.349609,-7.699219 L 76.449219,17.550781 A 7.461,7.461 0 0 0 76.949219,15 c 0,-2.349996 -2.849225,-4.5 -5.699219,-4.5 z"
                    ></path>
                    <path
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="m 106.25,1.0996094 c -1.8,0 -7.150391,7.875e-4 -7.150391,6.3007812 V 38.300781 c 0,3.649997 2.001171,5.09961 5.451171,5.09961 5.35,0 5.39844,-3.849611 5.39844,-5.09961 V 30 c -3.3,-0.699999 -4.34961,-2.800784 -4.34961,-5.800781 0,-3.049997 1.39961,-5.098829 4.34961,-5.798828 v -5.5 c 0,-2.199998 0.5,-2.201172 2.25,-2.201172 h 3.10156 c 4.25,0 4.94922,2.101174 4.94922,4.451172 0,2.649997 -1.19922,4.25 -4.94922,4.25 h -3.40039 c -3.35,0 -5.09961,1.549612 -5.09961,4.849609 0,4.599995 3.74961,4.75 5.09961,4.75 h 3.79883 c 2.9,0 15.65039,-1.4e-5 15.65039,-13.75 A 14.468,14.468 0 0 0 127.65039,4.9492187 c -2.6,-2.7499972 -5.65118,-3.8496093 -11.95117,-3.8496093 z"
                    ></path>
                    <path
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="m 151.19922,10.5 c -11.84999,0 -14.25,7.149221 -14.25,9.699219 A 3.526,3.526 0 0 0 140,23.949219 21.523,21.523 0 0 1 146.55078,22 c 0.55,-1.349999 1.19883,-3.050781 4.54883,-3.050781 2.75,0 2.95117,1.551172 2.95117,1.951172 0,1.249998 -1.50039,1.45 -5.65039,2 -5.44999,0.749999 -12.25,2.199226 -12.25,10.199218 0,4.849996 2.5504,10.300782 10.90039,10.300782 4.85,0 11.29883,-2.250004 11.29883,-6 a 3.7,3.7 0 0 0 -3.54883,-3.951172 3.975,3.975 0 0 0 -2.05078,0.601562 6.656,6.656 0 0 1 -3.69922,1.398438 2.036,2.036 0 0 1 -2.30078,-2.25 c 0,-1.899998 1.59922,-2.349219 2.94922,-2.699219 3.45,-0.899999 3.85117,-1.000391 4.45117,-1.400391 v 3.25 c 3.9,-0.449999 5.40039,2.701175 5.40039,4.951172 0,0.999999 -0.15078,3.19883 -3.80078,5.048828 0.4,0.4 1.14961,1.050782 3.84961,1.050782 3.65,0 5.34961,-1.500784 5.34961,-3.550782 0,-0.899999 -0.44922,-3.15 -0.44922,-3.5 V 20.949219 C 164.5,15.999224 161.59921,10.5 151.19922,10.5 Z" ></path>

                    <path 
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="m 185.90039,10.5 c -11.79999,0 -13.80078,5.849613 -13.80078,9.099609 a 6.584,6.584 0 0 0 2.40039,5.34961 6.2,6.2 0 0 0 -3,5.25 4.625,4.625 0 0 0 0.69922,2.701172 6.927,6.927 0 0 1 3.80078,-1 c 3.8,0 6.1,1.949613 6.5,5.599609 a 74.2,74.2 0 0 1 8.30078,0.550781 c 0.75,0.15 1.69922,0.449611 1.69922,1.34961 0,2.099998 -4.40078,2.099609 -5.30078,2.099609 -0.9,0 -6.5,7.79e-4 -6.5,-2.449219 0,-0.25 0.45117,-1.551563 0.45117,-1.851562 0,-2.249998 -2.05117,-4.09961 -5.20117,-4.09961 -5.95,0 -5.94922,6.551173 -5.94922,6.951172 0,7.949992 9.60079,9.398438 15.80078,9.398438 5,0 17.34961,-0.598448 17.34961,-10.398438 0,-8.099992 -8.94961,-8.651562 -12.84961,-8.851562 -8.54999,-0.5 -9.5,-0.548829 -9.5,-1.548828 a 1.5,1.5 0 0 1 0.34961,-0.75 27.288,27.288 0 0 0 5.34961,0.449218 c 5.79999,0 13.40078,-1.948835 13.05078,-8.798828 2.1,0 3.94922,-0.250004 3.94922,-4.5 C 203.5,12.650784 202.64961,10.5 199.84961,10.5 A 8.914,8.914 0 0 0 195,12.099609 C 193.6,11.49961 191.50039,10.5 185.90039,10.5 Z m 0.0488,7.050781 c 1.35,0 3.35156,0.49883 3.35156,2.298828 0,1.699999 -2.05156,2.050782 -3.35156,2.050782 -1.45,0 -3.34961,-0.399611 -3.34961,-2.09961 0,-1.699998 1.94961,-2.25 3.34961,-2.25 z"></path>

                    <path 
                    style={{ fill: "rgb(25, 22, 21)" }}
                    d="m 222.05078,10.5 c -10.74999,0 -15.25,8.200399 -15.25,16.400391 0,7.499992 3.69845,16.5 16.14844,16.5 8.99999,0 13.85156,-5.850785 13.85156,-9.550782 0,-2.899997 -2.95078,-4.298828 -5.30078,-4.298828 a 4.849,4.849 0 0 0 -4.30078,2.25 c -1.05,1.899998 -1.59844,2.898438 -4.64844,2.898438 -4.29999,0 -4.75078,-2.54883 -5.05078,-4.298828 h 9 a 6.462,6.462 0 0 1 5.05078,-2.050782 7.108,7.108 0 0 1 3.59961,0.951172 4.694,4.694 0 0 0 2.09961,-4.351562 C 237.25,21.199222 234.35077,10.5 222.05078,10.5 Z m 0.0996,8.25 c 3.35,0 4.29883,2.550782 4.29883,3.300781 0,0.4 -0.24883,0.449219 -0.79883,0.449219 h -8.05078 c 0.75,-3.299997 3.05078,-3.75 4.55078,-3.75 z"></path>
                    {/* Continuar agregando los otros paths aquí */}
                </svg>
                </span>
                            <span className="add-sectionTitle__text-02">Mi página</span>
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
                                <div className="box_top">
                                    <div className="info">
                                        <ul>
                                            <li className="fol">
                                                <p className="caption">Dirección de correo electrónico</p>
                                                <p className="txtx">{user.email}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Te llamas</p>
                                                <p className="txtx">{`${user.first_name} ${user.last_name}`}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Teléfono</p>
                                                <p className="txtx">{`${user.telefono}`}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Departamento</p>
                                                <p className="txtx">{`${user.department}`}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Ciudad</p>
                                                <p className="txtx">{`${user.city}`}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Código postal</p>
                                                <p className="txtx">{user.postal_code}</p>
                                            </li>
                                            <li className="fol">
                                                <p className="caption">Boletín de noticias por correo electrónico</p>
                                                <p className="txtx">Recibir</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btn">
                                        <p className="btn">
                                            <Link to="/edituser" className="btn_black_border hoverBtn">Edita tu información</Link>
                                        </p>
                                        <p className="btn">
                                            <a href="/password" className="btn_black_border hoverBtn">
                                                Cambia tu contraseña
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <h3 className="info_direccion">Información de dirección predeterminada</h3>
                                <div className="box_bottom">
                                    <div className="info">
                                        <div className="address">
                                            <p className="line1">{user.address || "No hay información de dirección registrada"}</p>
                                        </div>
                                    </div>
                                </div>
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
            {loadingOrders ? (
                <p>Cargando pedidos...</p>
            ) : orders.length === 0 ? (
                <p>No tienes pedidos realizados.</p>
            ) : (
                orders.slice(0, 3).map((order) => ( // Mostrar solo los 3 últimos pedidos
                    <div key={order.id} className="order-card">
                        <div className="order-card-left">
                            <img
                                src={pedidosImage} // Reemplaza por la ruta correcta
                                alt="Pedido"
                                className="order-image"
                            />
                            <div className="order-details">
                                <p>
                                    <strong>Pedido ID:</strong> {order.id}
                                </p>
                                <p>
                                    <strong>Estado:</strong> {order.estado}
                                </p>
                                <p>
                                    <strong>Fecha:</strong> {order.fecha_venta}
                                </p>
                                <p>
                                    <strong>Total:</strong> {order.total} COP
                                </p>
                            </div>
                        </div>
                        <div className="order-card-right">
                            <p>{order.productos.length} producto{order.productos.length > 1 ? 's' : ''}</p>
                            <button
                                className="btn_black_border hoverBtn"
                                onClick={() => handleMoreDetails(order.id)}
                            >
                                Más Detalles
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
        {orders.length > 3 && ( // Mostrar el botón solo si hay más de 3 pedidos
            <div className="view-more-orders">
                <button
                    className="vermas"
                    onClick={() => navigate("/mispedidos")} // Redirigir a la página de todos los pedidos
                >
                    Ver más pedidos
                </button>
            </div>
        )}
    </div>
</section>


                    {/* Logout */}
                    <div className="box_btn5">
                        <p className="btn5">
                            <a href="/" onClick={handleLogout}>Cerrar sesión</a>
                        </p>
                    </div>
                </div>
            </main>
            <FooterComponent />
        </>
    );
};

export default MainPage;
