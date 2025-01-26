import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_ENTORNO, VITE_ENV_MS_PYTHON_API_URL_DESARROLLO, VITE_ENV_MS_PYTHON_API_URL_PRODUCCION } = getEnvVariables();

const pythonMsAPI = axios.create({
    baseURL: VITE_ENTORNO === 'desarrollo' ? VITE_ENV_MS_PYTHON_API_URL_DESARROLLO : VITE_ENV_MS_PYTHON_API_URL_PRODUCCION
});

function cargarToken() {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
        try {
            const parsedData = JSON.parse(tokenString);

            if (parsedData && parsedData.usuario) {
                const { usuario, token } = parsedData;
                const { id, name, email, password } = usuario;
                /*  setUser({ id, name, email, password });
                 setUserToken(token); */
                return token;
            } else {
               /*  console.warn("El formato de `parsedData` no es el esperado."); */
            }
        } catch (error) {
          /*   console.error("Error al analizar el JSON del token", error); */
        }
    } else {
  /*       console.warn("out session"); */
    }
}


pythonMsAPI.interceptors.request.use(config => {
    const payloadToken = cargarToken();
    console.log("VEO EL TOKEN NESTJS", payloadToken, VITE_ENTORNO === 'desarrollo' ? VITE_ENV_MS_PYTHON_API_URL_DESARROLLO : VITE_ENV_MS_PYTHON_API_URL_PRODUCCION);
    if (payloadToken) {
        config.headers = {
            ...config.headers,
            'Authorization': payloadToken
        };
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default pythonMsAPI;
