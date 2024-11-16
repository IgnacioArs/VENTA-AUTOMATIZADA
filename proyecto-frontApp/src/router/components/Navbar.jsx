import React, { useEffect, useState } from 'react';
import '../../css/navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logAuthMethod from '../../utils/logAuth';
import apagado from '../../components/icon/apagado.png'
import inicioIcon from '../../components/icon/inicio.png'
import loginIcon from '../../components/icon/login.png'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const { authPayload, status } = useSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable

    // Hook para obtener la ubicación actual
    const location = useLocation();

    useEffect(() => {
        const tokenString = localStorage.getItem("token");

        if (tokenString) {
            console.log("AQUI VIENDO ESTO", tokenString);
            try {
                const parsedData = JSON.parse(tokenString);

                // Validación del formato esperado
                if (parsedData && parsedData.user && parsedData.token) {
                    const { user: usuario, token } = parsedData;
                    const { id, name, email, password } = usuario;

                    setUser({ id, name, email, password });
                    setUserToken(token);
                } else {
                    console.warn("El formato de `parsedData` no es el esperado.");
                }
            } catch (error) {
                console.error("Error al analizar el JSON del token", error);
            }
        } else {
            console.warn("out session");
        }
    }, [authPayload, status]);


    const handleLogout = () => {
        setUser(null);
        logAuthMethod(dispatch, navigate);
    };

    // Función para verificar si la ruta está activa
    const isActive = (path) => {
        return location.pathname === path ? 'navbar-link active' : 'navbar-link';
    };

    // Función para alternar el menú desplegable
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu-tres">
                {user !== null && status === "authenticated" ? (
                    <ul className="navbar-menu">
                        <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/chatbot" className={isActive('/chatbot')}>Chatear con IA</Link></li>
                    </ul>
                ) : (
                    <></>
                )}
            </ul>
            <ul className="navbar-menu-dos">
                {user !== null && status === "authenticated" ? (
                    <header>
                        <div className="user-menu" onClick={toggleMenu}>
                            <span className="spam">{user ? user?.name : ""} Menu</span>
                            {menuOpen && (
                                <div className="user-menu-content">
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/settings">Settings</Link>
                                    {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
                                    <Link onClick={handleLogout}><div className='imagen'><img className="imagen-fondo" src={apagado} /></div></Link>
                                </div>
                            )}
                        </div>
                    </header>
                ) : (
                    <>
                        <li><Link to="/inicio" className={isActive('/inicio')}><img className='inicio-imagen' src={inicioIcon} alt="Error icon" role="presentation" /></Link></li>
                        <li><Link to="/login" className={isActive('/login')}><img className='inicio-imagen' src={loginIcon} alt="Error icon" role="presentation" /></Link></li>
                        <div className='contorno'>
                            <li><Link to="/registro" className={isActive('/registro')}>Registro</Link></li>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

