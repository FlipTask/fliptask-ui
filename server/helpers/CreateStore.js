const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk");
const axios = require("axios");
const Cookies = require("universal-cookie");
const reducers = require("../../client/reducers");

module.exports = (req) => {
    const cookies = new Cookies(req.headers.cookie);
    const axiosInstance = axios.create({
        baseURL: `http://${process.env.API_URL}/api`,
        headers: { cookie: req.get("cookie") || "" }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument({
        api: axiosInstance,
        cookies
    })));
    return store;
};
