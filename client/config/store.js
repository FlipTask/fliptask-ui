import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookies from "universal-cookie";
import reducers from "../reducers";
import API from "./api";
import {
    setHeaderInApi
} from "../actions";

const appName = require("../../package.json").name;

const cookies = new Cookies();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let enhancer = "";
if (process.env.NODE_ENV === "production") {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api: API,
            cookies
        }))
    );
} else {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api: API,
            cookies
        }))
    );
}
const preloadedState = window.INITIAL_STATE;
const store = createStore(
    reducers, // reducers
    preloadedState,
    enhancer
);

if (localStorage.getItem(`${appName}-jwttoken`)) {
    store.dispatch(setHeaderInApi(
        localStorage.getItem(`${appName}-jwttoken`)
    ));
}

export default store;
