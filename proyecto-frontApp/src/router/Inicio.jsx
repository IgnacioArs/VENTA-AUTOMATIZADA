import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/inicio.css';
import verifySession from '../utils/verifySession';
import { useSelector } from 'react-redux';
import TestimonialsCarousel from './components/TestimonialsCarousel';

const Inicio = () => {
    const { authPayload, status } = useSelector(state => state.auth);
    const navegar = useNavigate();

    const onClickLoginIr = () => {
        navegar('/login');
    }

    const onClickRegistroIr = () => {
        navegar('/registro');
    }

    useEffect(() => {
        const sessionState = verifySession(authPayload, status);
        if (sessionState === true) {
            return navegar("/dashboard");
        }
    }, [authPayload, status, navegar]);

    return (
        <div className="inicio-container">
            <div className='container-dos'>
                <div className='col-md-6-1'>
                    <h1 className='h1'>Bienvenido a Innovanding</h1>
                    <p className='p'>Explora nuestras innovadoras soluciones en Inteligencia Artificial</p>
                </div>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <button onClick={onClickLoginIr} className="cta-button">Iniciar sesión</button>
                        </td>
                        <td>
                            <button onClick={onClickRegistroIr} className="cta-button">Registrarse</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="col-md-6-3">
                <div className="image-container"></div>
                <div className="text-container">
                    <h1>Mantenimiento Predictivo</h1>
                    <p>
                        Utilizamos tecnología avanzada para anticipar y prevenir fallos en sus sistemas, garantizando una operación sin interrupciones.
                    </p>
                </div>
            </div>

            {/* Nuevas secciones de características */}
            <div className="features-container">
                <div className="feature-box">
                    <h3>Optimización de Recursos</h3>
                    <p>Automatiza procesos y optimiza el uso de tus recursos, mejorando la eficiencia operativa en tiempo real.</p>
                </div>
                <div className="feature-box">
                    <h3>Transformación Digital</h3>
                    <p>Con nuestras soluciones de IA, tu empresa da el siguiente paso hacia la digitalización total.</p>
                </div>
                <div className="feature-box">
                    <h3>Soporte Avanzado</h3>
                    <p>Recibe soporte técnico avanzado para asegurar la continuidad de tu negocio con IA y aprendizaje automático.</p>
                </div>
            </div>

            {/* Nueva sección para logoia.png */}
            <div className="col-md-6-3">
                <div className="image-container-ia"></div> {/* Aquí va el logo de IA */}
                <div className="text-container">
                    <h1>Asistentes Virtuales</h1>
                    <p>
                        Asistentes Virtuales es un servicio dedicado a proporcionar asistencia personal y profesional a través de tecnología avanzada de inteligencia artificial. Ideal para empresas y particulares que necesitan optimizar su tiempo y recursos.
                    </p>
                </div>
            </div>

            {/* Testimonios */}
            <TestimonialsCarousel />

            {/* Nueva sección de círculos */}
            <div className="circles-container">
                <div className="circle">
                    <h3>Automatización Total</h3>
                    <p>Gracias a la inteligencia artificial, nuestros procesos son completamente automatizados, lo que reduce el error humano y mejora la eficiencia.</p>
                </div>
                <div className="circle">
                    <h3>Variedad de Productos</h3>
                    <p>Desde productos electrónicos hasta soluciones personalizadas, ofrecemos una amplia gama de productos para satisfacer todas tus necesidades.</p>
                </div>
                <div className="circle">
                    <h3>Venta Eficiente</h3>
                    <p>La compra de nuestros productos es rápida y sencilla, con recomendaciones personalizadas basadas en tus preferencias y comportamientos.</p>
                </div>
            </div>
        </div>
    );
}

export default Inicio;




