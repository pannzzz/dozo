import React from 'react';
import Navbar from '../components/Navbar';
import AboutIcon from '../assets/AboutIcon';
import '../styles/About.css';
import image1 from '../assets/img-about/about-01.png';
import image2 from '../assets/img-about/about-02.png';
import image3 from '../assets/img-about/about-03.png';
import FooterComponent from '../components/FooterComponent';

const About = () => {
    return (
        <>
            <Navbar initialScrolled={true} />
            <div className="about-container">
            <a href="/" className="breadcrumb-home1">Dozo</a> / Acerca de (¿Qué es dozo?)
                <AboutIcon />
                <h3>¿Qué es la dozo?</h3>
                
                {/* Primera sección */}
                <div className="about-content">
                    <div className="about-images">
                        <img src={image1} alt="Ilustración 1" className="about-image" />
                    </div>
                    <div className="about-text">
                        <h2>Comenzando con un conjunto, una nueva experiencia</h2>
                        <p>
                            dozo ofrece una selección de ropa que permite al<br />
                            cliente elegir lo que mejor encaje con<br />
                            su estilo propio.<br />
                            Cada persona puede elegir entre varios estilos<br />
                            únicos, seleccionados cuidadosamente para que<br />
                            <span className="highlight">resalten la personalidad<br />
                            de quien los lleva.</span>
                        </p>
                    </div>
                </div>

                {/* Segunda sección */}
                <div className="about-content">
                    <div className="about-text second-section">
                        <p>
                            Cuando no sé qué estilo usar, o<br />
                            cuando busco algo diferente, quiero<br />
                            <span className="highlight">sentir que "me expreso" desde lo más profundo de mi estilo.</span>
                        </p>
                        <p>
                            "accesorios" <br />
                            "conjunto" <br />
                            "look"...
                        </p>
                    </div>
                    <div className="about-images second-section">
                        <img src={image2} alt="Ilustración 2" className="about-image" />
                    </div>
                </div>

                {/* Tercera sección */}
                <div className="about-content third-section">
                    <div className="about-text">
                        <p>
                            A través del método de selección de atuendos<br />
                            "Estilo Personal",<br />
                            te ofreceremos la alegría de elegir conjuntos y<br />
                            la oportunidad de<br />
                            explorar los estilos y "me gusta" de otros clientes.
                        </p>
                        <p className="highlight-text">
                            <span className="highlight">Ahora, comencemos a "vestirnos" con<br /> ese toque personal.</span>
                        </p>
                    </div>
                    <div className="about-images third-section">
                        <img src={image3} alt="Ilustración 3" className="about-image" />
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default About;
