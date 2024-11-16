import React from 'react'
import '../../css/footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <nav className="footer-nav">
                    <ul>
                        <li><a href="#inicio">Página de inicio</a></li>
                        <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
                        <li><a href="#servicios">Servicios</a></li>
                        <li><a href="#caracteristicas">Características</a></li>
                        <li><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>
                        <li><a href="#clientes">Clientes</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </nav>
                <div className="footer-info">
                    <p>Copyright © 2024 Todos los derechos reservados - NovaEdge</p>
                    <p>Desarrollado por <a href="https://www.site123.com" target="_blank">SITE123 - Páginas Web Gratis</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer