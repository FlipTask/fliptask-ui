import {
    TOGGLE_SIDE_NAV,
    TOGGLE_THEME
} from "../constants/ActionTypes";

const setThemeInCookie = (cookies, theme) => {
    cookies.set("theme", theme, { path: "/" });
};

export const toggleSideNav = () => async (dispatch) => {
    dispatch({
        type: TOGGLE_SIDE_NAV
    });
};

export const toggleTheme = (payload) => async (dispatch, getState, { cookies }) => {
    setThemeInCookie(cookies, payload);
    dispatch({
        type: TOGGLE_THEME,
        payload
    });
};
