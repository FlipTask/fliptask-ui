import API from "../config/api";
import {
    USER_LOGIN_PENDING,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from "../constants/ActionTypes";
import {
    fetchUser,
    toggleTheme
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
        cookies.set(tokenCookieName, token);
    } else {
        cookies.remove("theme");
        cookies.remove("active-org");
        cookies.remove(tokenCookieName);
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

export const logout = () => async (dispatch, getState, { api, cookies }) => {
    try {
        const res = await api.get("/user/logout");
        dispatch({
            type: USER_LOGOUT,
            payload: res.data
        });
        dispatch(setAuthTokenInSession());
        dispatch(toggleTheme("day"));
    } catch (err) {
        dispatch(setAuthTokenInSession());
        // console.log(err.response.status);
    }
};


export const verifyEmail = (token) => async (dispatch, getState, { api }) => {
    try {
        const res = await api.get(`/user/verify_email/${token}`);
        return res.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            error: true,
            data: null,
            message: {
                error: "Something is wrong!"
            }
        };
    }
};
