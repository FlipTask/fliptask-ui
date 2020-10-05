import { toggleTheme } from "../actions";

const getThemeFromCookie = (store, cookies) => {
    const preSelectedTheme = cookies.get("theme");
    store.dispatch(toggleTheme(preSelectedTheme));
};

export default getThemeFromCookie;
