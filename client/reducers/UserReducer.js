
import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_PENDING,
    USER_LOGIN_SUCCESS,
    FETCH_USER_PENDING,
    FETCH_USER_SUCCESS,
    USER_LOGOUT
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    userLoading: false,
    isAuthorised: false,
    user: {},
    isLoading: false,
    error: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case FETCH_USER_PENDING:
        return {
            ...state,
            ...state,
            userLoading: true
        };
    case USER_LOGIN_PENDING:
        return {
            ...state,
            ...state,
            isLoading: true
        };
    case FETCH_USER_SUCCESS:
        return {
            ...state,
            ...state,
            userLoading: false,
            user: { ...payload.data },
            isAuthorised: true,
            isLoading: false,
            error: {}
        };
    case USER_LOGIN_SUCCESS:
        return {
            ...state,
            ...state,
            user: { ...payload.data.user },
            isAuthorised: true,
            isLoading: false,
            error: {}
        };
    case USER_LOGIN_FAILURE:
        return {
            ...state,
            ...state,
            user: {},
            isAuthorised: false,
            isLoading: false,
            error: {
                message: payload.messages.error
            }
        };
    case USER_LOGOUT:
        return {
            ...state,
            ...state,
            ...INITIAL_STATE
        };
    default:
        return state;
    }
};
