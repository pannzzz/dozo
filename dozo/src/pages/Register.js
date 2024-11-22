import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Register.css';
import Formulario from '../components/Formulario';

const Register = () => {
    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="login-container">
                <div className="breadcrumb">
                    <a href="/" className="breadcrumb-home">Dozo</a> / Registro de clientes
                </div>
            </div>
            <div className="register-container">
                <h2>Registro de nuevos miembros</h2>
                <p>¡Aquellos que se registren como miembros les damos la bienvenida a todos lo que vayan a ser y seran parte de Dozo!</p>
            </div>
            <Formulario />
        </>
    );
};
export default Register;