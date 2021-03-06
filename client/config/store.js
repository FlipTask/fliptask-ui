import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookies from "universal-cookie";
import reducers from "../reducers";
import api from "./api";
import getTheme from "./theme";

const cookies = new Cookies();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let enhancer = "";
if (process.env.NODE_ENV === "production") {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api,
            cookies
        }))
    );
} else {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api,
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
getTheme(store, cookies);
export default store;
