import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los estilos de Bootstrap Icons
import Logo from '../assets/logo-white.svg'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import '../styles/footer.css';

const FooterComponent = () => {
    return (
        <footer className="footer-container">
            <div className="footer-logo">
                <img src={Logo} alt="dōzo logo" className="footer-logo-img" />
            </div>

            <div className="footer-links">
                <Link to="/findgift" className="footer-link">Encuentra tu estilo</Link>
                <Link to="/About" className="footer-link">¿Qué es el dozo?</Link>
                <Link to="/how-to" className="footer-link">Cómo usar dozo</Link>
                <Link to="/login" className="footer-link">Inicio de sesión / Registro de nuevos miembros</Link>
            </div>

            <div className="footer-info">
                <p>
                    <Link to="/faq" className="footer-link">Preguntas frecuentes</Link> |
                    <Link to="/contact" className="footer-link"> Contáctenos</Link> |
                    <Link to="/corporate-services" className="footer-link"> Servicios Corporativos</Link> |
                    <Link to="/privacy-policy" className="footer-link"> Política de privacidad</Link> |
                    <Link to="/terms" className="footer-link"> Términos y condiciones</Link> |
                    <Link to="/operating-company" className="footer-link"> Empresa Operadora</Link> |
                    <Link to="/commercial-law" className="footer-link"> Anotación basada en la Ley de Transacciones Comerciales Especificadas</Link>
                </p>
            </div>

            <div className="footer-copyright">
                <p>©dozo 2024</p>
            </div>
        </footer>
    );
};

export default FooterComponent;
