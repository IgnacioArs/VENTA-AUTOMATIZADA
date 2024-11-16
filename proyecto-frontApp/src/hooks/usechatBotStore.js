import pythonMsAPI from '../api/pythonMSApi';
import { useSelector } from 'react-redux';

export const pythonApiMs = () => {
    const { authPayload, status } = useSelector(state => state.auth);

    const chatBotEnpoint = async (message) => {
        try {
            // Verifica si authPayload es un objeto, si es así, no uses JSON.parse
            let objectData = typeof authPayload === 'string' ? JSON.parse(authPayload) : authPayload;

            if (objectData?.token && status === "authenticated" && message) {
                // Construye la URL correctamente con el parámetro de consulta
                const { data, config, headers, status, statusText, request } = await pythonMsAPI.get(
                    `/chatbot/chat-bot/${message}`,
                    {
                        headers: {
                            Authorization: `Bearer ${objectData.token}`,
                        },
                    }
                );

                return {
                    data: data,
                    config: config,
                    headers: headers,
                    status: status,
                    statusText: statusText,
                    request: request
                }
            }

        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            return error;
        }
    }

    return {
        chatBotEnpoint,
    }
}
