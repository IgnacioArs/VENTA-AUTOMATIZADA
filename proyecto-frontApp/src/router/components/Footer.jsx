import React from 'react';
import '../../css/footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <nav className="footer-nav">
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
                        <li><a href="#servicios">Servicios</a></li>
                        <li><a href="#caracteristicas">Características</a></li>
                        <li><a href="#preguntas-frecuentes">FAQ</a></li>
                        <li><a href="#clientes">Clientes</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </nav>
                <div className="footer-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <div className="footer-info">
                    <p>&copy; 2024 Todos los derechos reservados - NovaEdge</p>
                    <p>Desarrollado por <a href="https://www.site123.com" target="_blank" rel="noopener noreferrer">SITE123 - Páginas Web Gratis</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
