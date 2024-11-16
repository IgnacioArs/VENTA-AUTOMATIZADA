import { setAuthPayload, setStatus } from "../store/auth/authSlice";

// logAuth.js
const logAuthMethod = (dispatch, navigate) => {
    // Elimina solo el token del localStorage
    localStorage.removeItem("token");
    dispatch(setAuthPayload({}));
    dispatch(setStatus("not-authenticated"));
    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
}

export default logAuthMethod;
