import API from "../config/api";
import {
    USER_LOGIN_PENDING,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from "../constants/ActionTypes";
import {
    fetchUser
} from "./index";

const tokenCookieName = "token";
export const setHeaderInApi = (token) => async () => {
    if (token) {
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common.Authorization;
    }
};

export const setAuthTokenInSession = (token) => async (dispatch, getState, { cookies }) => {
    dispatch(setHeaderInApi(token));
    if (token) {
        cookies.set(tokenCookieName, token, { path: "/" });
    } else {
        cookies.remove("active-org");
        cookies.remove(tokenCookieName, { path: "/" });
    }
};

export const tryLogin = (obj = {}) => async (dispatch, getState, { api }) => {
    try {
        dispatch({
            type: USER_LOGIN_PENDING
        });
        const res = await api.post("/user/login", {
            ...obj
        });
        dispatch(setAuthTokenInSession(res.data.data.token));
        dispatch(fetchUser());
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: e.response.data
        });
    }
};

export const logout = () => async (dispatch, getState, { api }) => {
    const res = await api.get("/user/logout");
    try {
        dispatch({
            type: USER_LOGOUT,
            payload: res.data
        });
        dispatch(setAuthTokenInSession());
    } catch (err) {
        dispatch(setAuthTokenInSession());
        // console.log(err.response.status);
    }
};
