import React, { useEffect, useState } from 'react';
import ErrorModal from '../components/modals/errorModal'; // Ajusta la ruta según tu estructura
import { authSession } from '../hooks/auth';
import '../css/formulario.css'
import { useNavigate } from 'react-router-dom';
import verifySession from '../utils/verifySession';
import { useSelector } from 'react-redux';

const Login = () => {

    //utilizamos hooks para navegar
    const navigate = useNavigate();

    //vemos la data payload de session
    const { authPayload, status } = useSelector(state => state.auth);

    //buscamos el hooks para realizar la session con el metodo correspondiente
    const { login } = authSession();

    //estados de los campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onchangeEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const onchangePassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }

    const onclickLogin = async (e) => {
        e.preventDefault();
        if (!email) {
            setAbrirModal(true);
            setMensajeModal('Por favor ingrese email');
            return
        }

        if (!password) {
            setAbrirModal(true);
            setMensajeModal('Por favor ingrese Password');
            return
        }

        const payloadLoginSession = {
            "email": email,
            "password": password
        }

        const resLogin = await login(payloadLoginSession);
        if (resLogin === 400 || resLogin === 401 || resLogin === 404) {
            setAbrirModal(true);
            setMensajeModal('Error al ingresar los datos correspondientes');
            return
        }

        if (resLogin.status === 201) {
            setEmail('');
            setPassword('');
            return
        }

    };

    const cerrarModal = (estado) => {
        setAbrirModal(estado); // Cierra el modal
    };

    /*  seccion para el modal */
    const [abrirModal, setAbrirModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');



    const onclickIrRegistro = () => {
        return navigate("/registro");
    }


    useEffect(() => {
        const sessionState = verifySession(authPayload, status)
        if (sessionState === true) {
            return navigate("/dashboard");
        }
    }, []);

    return (
        <div className='col'>
            <div className='col-md-6'>
                <div className="container formulario-container">
                    <div className="formulario-content">
                        <header>Login</header>
                        <form className="form-container">
                            <div className="field">
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='email@gmail.com'
                                    onChange={onchangeEmail}
                                    value={email}
                                />
                            </div>
                            <div className="field">
                                <input
                                    type='password'
                                    name='password'
                                    className="pass-key"
                                    placeholder='Password'
                                    onChange={onchangePassword}
                                    value={password}

                                />
                            </div>
                            <div className="space">
                                <button onClick={onclickLogin}>Acceder</button>
                            </div>
                            <div className="pass">
                                <a className='textA' onClick={onclickIrRegistro}>¿Se ha olvidado de su contraseña?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ErrorModal abrirModal={abrirModal} cerrarModal={cerrarModal} MensajeAlerta={mensajeModal} />
        </div>

    );
};

export default Login;
