import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import Cookies from "universal-cookie";
import reducers from "../../client/reducers";

const getUrl = () => {
    const apiUrl = process.env.API_URL;
    if (apiUrl.indexOf("http://") > -1 || apiUrl.indexOf("https://") > -1) {
        return process.env.API_URL;
    }
    return `http://${process.env.API_URL}`;
};

export default (req) => {
    const cookies = new Cookies(req.headers.cookie);

    const axiosInstance = axios.create({
        baseURL: `${getUrl()}/api`,
        headers: { cookie: req.get("cookie") || "" }
    });

    axiosInstance.interceptors.request.use((request) => {
        console.log(`[AXIOS Request][${request.baseURL}] ${request.method} ${request.url}`);
        return request;
    });

    axiosInstance.interceptors.response.use((response) => {
        console.log(`[AXIOS Response][${response.config.baseURL}] ${response.status} ${response.config.url}`);
        return response;
    }, (err) => err.response.data);

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument({
        api: axiosInstance,
        cookies
    })));
    return store;
};
