import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import SideMenu from './SideMenu';
import Text from './Text';
import MovingBanner from './MovingBanner';
import '../styles/Navbar.css';
import cartIcon from '../assets/icons/icon-cart.svg';
import logo from '../assets/logo.svg';

const Navbar = ({ initialScrolled = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(initialScrolled);
    const [user, setUser] = useState(null); // Estado para manejar el usuario
    const { cart } = useCart(); // Usar el contexto del carrito

    useEffect(() => {
        // Obtener usuario desde localStorage
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(initialScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [initialScrolled]);

    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <div className="navbar-container">
            <MovingBanner />

            <div className={navbarClasses.join(' ')}>
                <div className="navbar-left">
                    {scrolled ? (
                        <img src={logo} alt="logo" className="navbar-logo-left" />
                    ) : (
                        <Text />
                    )}
                </div>

                {!scrolled && (
                    <div className="navbar-center">
                        <img src={logo} alt="logo" className="navbar-logo" />
                    </div>
                )}

                <div className="navbar-right">
                    <Link to="/findgift" className="search-form">
                        <button type="button" className="search-button">
                            <i className="bi bi-search"></i>
                        </button>
                        <span>Encuentra tu estilo</span>
                    </Link>

                    {user ? (
                        <Link to="/minpage" className="login-link">
                            Hola, {user.username}
                        </Link>
                    ) : (
                        <Link to="/login" className="login-link">INICIAR SESIÓN</Link>
                    )}

                    <Link to="/carrito" className="cart">
                        <img src={cartIcon} alt="Carrito de compras" className="cart-icon" />
                        <span className="cart-count">{cart.length}</span>
                    </Link>

                    <button className="menu-icon" onClick={toggleMenu}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
            </div>

            {menuOpen && <SideMenu closeMenu={toggleMenu} />}
        </div>
    );
};

export default Navbar;