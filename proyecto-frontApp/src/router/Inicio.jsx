import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/inicio.css';
import logoIa from '../components/images/logoia.png';
import verifySession from '../utils/verifySession';
import { useSelector } from 'react-redux';

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
                    <h1 className='h1'>Bienvenido a NovaEdge</h1>
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
                <div className="image-container">
                    {/* Imagen de fondo */}
                </div>
                <div className="text-container">
                    <h1>Mantenimiento Predictivo</h1>
                    <p>
                        Utilizamos tecnología avanzada para anticipar y prevenir fallos en sus sistemas, garantizando una operación sin interrupciones.
                    </p>
                </div>
            </div>


            <div className='col-md-6-2'>
                <div className='text-container'>
                    <h1>Asistentes Virtuales</h1>
                    <p>
                        Asistentes Virtuales es un servicio dedicado a proporcionar asistencia personal y profesional a través de tecnología avanzada de inteligencia artificial. Ideal para empresas y particulares que necesitan optimizar su tiempo y recursos.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Inicio;


