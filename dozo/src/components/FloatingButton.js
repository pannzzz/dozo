import React from 'react';
import '../styles/FloatingButton.css'; // Archivo de estilos para el botón flotante
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el ícono de WhatsApp desde react-icons

const FloatingButton = () => {
    return (
        <a 
            href="https://wa.me/573027440953" // Enlace directo a WhatsApp con el número +57 3027440953
            target="_blank" 
            rel="noopener noreferrer" 
            className="add-fixedBadge add-js-fixedBadge add-is-fixed add-is-positionAdjust"
        >
            <span className="add-fixedBadge__inner">
                <img
                    src="https://auth.dozo-gift.com/front/v1_1/images/home/badge-bg.svg"
                    alt=""
                    className="amarillo"
                />
                <img
                    src="https://auth.dozo-gift.com/front/v1_1/images/home/badge-bg-text.svg"
                    alt=""
                    className="letras"
                />
                <FaWhatsapp className="lupa whatsapp-icon" /> {/* Ícono de WhatsApp */}
            </span>
        </a>
    );
};

export default FloatingButton;
