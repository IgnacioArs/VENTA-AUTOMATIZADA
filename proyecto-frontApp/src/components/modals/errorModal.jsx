import React from 'react';
import '../../css/modals.css';
import errorIcon from '../icon/error.png';

const ErrorModal = ({ abrirModal, cerrarModal, MensajeAlerta }) => {

    if (abrirModal === false) {
        return null;
    }

    return (
        <dialog open className="containerModals">
            <div className='cerrarModals' onClick={() => cerrarModal(false)}>X</div>
            <div className='contenedorMensajeModals'>
                <div className='modalImagen'>
                    <img src={errorIcon} alt="Error icon" role="presentation" />
                </div>
                <div className='mensajeModals'>{MensajeAlerta}</div>
            </div>
            <div className='contenedorBotonModals'>
                <div className='botonModals' onClick={() => cerrarModal(false)}>Cerrar</div>
            </div>
        </dialog>
    );
};

export default ErrorModal;

