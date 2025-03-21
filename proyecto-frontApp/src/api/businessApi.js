import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_ENTORNO, VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO, VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION } = getEnvVariables();

const businessApi = axios.create({
    baseURL: VITE_ENTORNO === 'desarrollo' ? VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO : VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION
});

function cargarToken() {
    const tokenString = localStorage.getItem("token"); // Obtenemos el token desde localStorage

    if (tokenString) {
        try {
            // Intentar analizar el token como JSON (si es un objeto almacenado)
            const parsedData = JSON.parse(tokenString);

            if (parsedData && typeof parsedData === 'object' && parsedData.token) {
                return parsedData.token; // Retornar directamente el token
            } else {
                // Si no es un objeto, retornarlo como está (para compatibilidad)
                return tokenString;
            }
        } catch (error) {
            // Si no se puede analizar, asumir que es un string plano
            return tokenString;
        }
    }

    /* console.warn("Sesión no iniciada o token no encontrado."); */
    return null; // No hay token
}

businessApi.interceptors.request.use(config => {
    const token = cargarToken();

  console.log("VEO EL TOKEN NESTJS", token,"LE PEGA A",VITE_ENTORNO,VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO,VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION); 

    if (token) {
        // Configurar los headers de la solicitud con el formato 'Bearer <token>'
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default businessApi;
