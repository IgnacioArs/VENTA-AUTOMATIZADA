import { setAuthPayload, setStatus } from "../store/auth/authSlice";

const sessionLogOutMethod = (dispatch) => {
    dispatch(setAuthPayload({}));
    dispatch(setStatus("no-authenticated"));
    console.log("PASANDO POR SESSION LOGOUT METHOD");
    return null;
}

export default sessionLogOutMethod;