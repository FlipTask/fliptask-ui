import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import Cookies from "universal-cookie";
import reducers from "../../client/reducers";
import getTheme from "../../client/config/theme";

const getUrl = () => {
    const apiUrl = process.env.API_URL;
    if (apiUrl.indexOf("http://") > -1 || apiUrl.indexOf("https://") > -1) {
        return process.env.API_URL;
    }
    return `http://${process.env.API_URL}`;
};

export default (req) => {
    /**
     *  Getting cookie from browser and sendind to API
     */
    const cookies = new Cookies(req.headers.cookie);
    const axiosInstance = axios.create({
        baseURL: `${getUrl()}`,
        headers: {
            cookie: req.get("cookie") || "",
            Authorization: `Bearer ${cookies.get("token") || ""}`,
            organisationid: cookies.get("active-org")
        }
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
            console.log(`[REQUEST_FAILED] ${error.response.config.url} ${error.response.status}`);
        }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument({
        api: axiosInstance,
        cookies
    })));
    getTheme(store, cookies);
    return store;
};
