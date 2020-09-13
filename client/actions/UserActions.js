import {
    FETCH_USER_PENDING,
    FETCH_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    SIGNUP_USER_PENDING,
    SIGNUP_USER_SUCCESS
} from "../constants/ActionTypes";
import {
    logout,
    setAuthTokenInSession
} from "./AuthActions";

export const fetchUser = () => async (dispatch, getState, { api }) => {
    // console.log("fromserver",fromServer);
    try {
        dispatch({
            type: FETCH_USER_PENDING
        });
        const res = await api.get("/user/me", {
            params: {
                include: "organisations"
            }
        });
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        // console.error(e);
        dispatch(setAuthTokenInSession());
        dispatch(logout());
    }
};

export const createNewUser = (obj = {}) => async (dispatch, getState, { api }) => {
    try {
        dispatch({
            type: SIGNUP_USER_PENDING
        });
        const res = await api.post("/user/signup", {
            ...obj
        });
        dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: SIGNUP_USER_FAILURE,
            payload: e.response.data
        });
    }
};
