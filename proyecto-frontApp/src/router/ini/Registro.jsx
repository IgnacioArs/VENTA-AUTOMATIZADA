import React, { useEffect, useState } from 'react';
import SuccessModal from '../../components/modals/succesModal';
import '../../css/ini/formulario.css'
import ErrorModal from '../../components/modals/errorModal';
import { authSession } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom'
import verifySession from '../../utils/verifySession';
import { useSelector } from 'react-redux';

const Registro = () => {
    //vemos la data payload de session
    const { authPayload, status } = useSelector(state => state.auth);
    //aqui utilizamos el useNavigate para poder navegar al login si se registra bien
    const navigate = useNavigate();
    //utizamos nuestro hooks para poder realizar el registro a nuestro microservicio
    const { registro } = authSession();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onchangeUsername = async (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onchangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onchangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onchangeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        setRepeatPassword(repeatPassword);
    }


    const onclickRegistro = async (e) => {
        e.preventDefault();
        if (!username) {
            setAbrirModalError(true);
            setMensajeModalError('Por favor ingrese username');
            return
        }

        if (!email) {
            setAbrirModalError(true);
            setMensajeModalError('Por favor ingrese email');
            return
        }

        if (!password) {
            setAbrirModalError(true);
            setMensajeModalError('Por favor ingrese Password');
            return
        }

        if (!repeatPassword) {
            setAbrirModalError(true);
            setMensajeModalError('Por favor ingrese segunda password');
            return
        }

        if (password != repeatPassword) {
            setAbrirModalError(true);
            setMensajeModalError('Las contraseñas no coinciden');
            return
        }
        let jsonUser = {
            "email": email,
            "password": password,
            "name": username
        }
        const resRegistro = await registro(jsonUser);
        console.log("se envia", jsonUser, "resultado es", resRegistro);
        if (resRegistro === 500) {
            setAbrirModalError(true);
            setMensajeModalError('El email o nombre de usuario se encuentran registrado');
            return
        }
        if (resRegistro === 400) {
            setAbrirModalError(true);
            setMensajeModalError('Ud debe ingresar los datos en orden');
            return
        }

        if (resRegistro?.status === 201) {
            setUsername('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setAbrirModal(true);
            setMensajeModal('Registro correctamente!');
        }

    };




    const cerrarModal = (estado) => {
        setAbrirModal(estado); // Cierra el modal
    };

    const cerrarModalError = (estado) => {
        setAbrirModalError(estado); // Cierra el modal
    };

    /*  seccion para el modal */
    const [abrirModal, setAbrirModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');

    const [abrirModalError, setAbrirModalError] = useState(false);
    const [mensajeModalError, setMensajeModalError] = useState('');

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
                <div className="imagen-izquierda-registro">
         
                </div>
                    <div className="formulario-content">
                        <header>Registrarse</header>
                        <form className="form-container">
                            <div className="field">
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='username'
                                    onChange={onchangeUsername}
                                    value={username}

                                />
                            </div>
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
                            <div className="field">
                                <input
                                    type='password'
                                    name='repeatPassword'
                                    className="pass-key"
                                    placeholder='repeatPassword'
                                    onChange={onchangeRepeatPassword}
                                    value={repeatPassword}

                                />
                            </div>
                            <div className='texto-enunciado'>
                            <div className="space">
                                <button onClick={onclickRegistro}>Registrar</button>
                            </div>
                            <div className="pass">
                                <a className='textA' onClick={onclickIrRegistro}>Por favor, Ingrese sus datos correspondientes</a>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal abrirModal={abrirModal} cerrarModal={cerrarModal} MensajeAlerta={mensajeModal} />
            <ErrorModal abrirModal={abrirModalError} cerrarModal={cerrarModalError} MensajeAlerta={mensajeModalError} />
        </div>
    );
};

export default Registro;