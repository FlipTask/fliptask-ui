import {
    TOGGLE_SIDE_NAV,
    TOGGLE_THEME
} from "../constants/ActionTypes";

const setThemeInCookie = (cookies, theme) => {
    cookies.set("theme", theme);
};

export const toggleSideNav = () => async (dispatch) => {
    dispatch({
        type: TOGGLE_SIDE_NAV
    });
};

export const toggleTheme = (payload) => async (dispatch, getState, { cookies }) => {
    console.log("payload", payload);
    setThemeInCookie(cookies, payload);
    dispatch({
        type: TOGGLE_THEME,
        payload
    });
};
