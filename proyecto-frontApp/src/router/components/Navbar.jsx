import React, { useEffect, useState } from 'react';
import '../../css/navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logAuthMethod from '../../utils/logAuth';
import inicioIcon from '../../components/icon/inicio.png';
import loginIcon from '../../components/icon/login.png';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { authPayload, status } = useSelector(state => state.auth);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
            try {
                const parsedData = JSON.parse(tokenString);
                if (parsedData?.user && parsedData?.token) {
                    setUser(parsedData.user);
                }
            } catch {
                console.error("Token inválido");
            }
        }
    }, [authPayload, status]);

    const handleLogout = () => {
        setUser(null);
        logAuthMethod(dispatch, navigate);
    };

    const isActive = (path) => location.pathname === path ? 'navbar-link active' : 'navbar-link';

    return (
        <nav className="navbar">
            <div className="navbar-logo"></div>
            <ul className="navbar-menu">
                {status === "authenticated" && user ? (
                    <>
                        <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/chatbot" className={isActive('/chatbot')}>Chatear con IA</Link></li>
                    </>
                ) : null}
            </ul>
            <ul className="navbar-menu">
                {status === "authenticated" && user ? (
                    <div className="user-menu">
                        <span onClick={() => setMenuOpen(!menuOpen)}>
                            {user.name}
                        </span>
                        {menuOpen && (
                            <div className="user-menu-content">
                                <Link to="/profile">Profile</Link>
                                <Link to="/settings">Settings</Link>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <li><Link to="/inicio" className={isActive('/inicio')}><img src={inicioIcon} alt="Inicio" /></Link></li>
                        <li><Link to="/login" className={isActive('/login')}><img src={loginIcon} alt="Login" /></Link></li>
                        <li><Link to="/registro" className={isActive('/registro')}>Registro</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
