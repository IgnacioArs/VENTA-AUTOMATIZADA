import { setAuthPayload, setStatus } from "../store/auth/authSlice";

const sessionSuccessMethod = (dispatch) => {
    const tokenString = localStorage.getItem("token");
    dispatch(setAuthPayload(tokenString));
    dispatch(setStatus("authenticated"));
    return true;
}

export default sessionSuccessMethod;