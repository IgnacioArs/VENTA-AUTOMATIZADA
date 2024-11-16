import { setAuthPayload, setStatus } from "../store/auth/authSlice";

const sessionLogOutMethod = (dispatch) => {
    dispatch(setAuthPayload({}));
    dispatch(setStatus("no-authenticated"));
    return null;
}

export default sessionLogOutMethod;