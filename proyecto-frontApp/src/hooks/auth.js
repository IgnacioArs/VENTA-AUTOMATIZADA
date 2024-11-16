import businessApi from '../api/businessApi'
import { useDispatch } from 'react-redux'
import { setAuthPayload, setStatus } from '../store/auth/authSlice'


export const authSession = () => {
    const dispatch = useDispatch();

    const registro = async (objectUsuario) => {
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/auth/registro`, objectUsuario);

            return {
                data: data,
                config: config,
                headers: headers,
                status: status,
                statusText: statusText,
                request: request
            }

        } catch (error) {
            return error.response.status;
        }
    }


    const login = async (objectUsuario) => {
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/auth/login`, objectUsuario);
            // Asegúrate de que data.token es una cadena, no un objeto JSON
            let token = data;

            // Verifica si el token es válido y haz algo con él, por ejemplo, guardarlo en el almacenamiento local
            if (token) {
                localStorage.clear();
                localStorage.setItem('token', JSON.stringify(token));
            }

            dispatch(setAuthPayload(data));
            dispatch(setStatus("authenticated"));
            return {
                data: data,
                config: config,
                headers: headers,
                status: status,
                statusText: statusText,
                request: request
            }
        } catch (error) {
            localStorage.clear();
            dispatch(setAuthPayload({}));
            dispatch(setStatus("not-authenticated"));
            return error.response.status;
        }
    }




    return {
        login,
        registro,
    }
}