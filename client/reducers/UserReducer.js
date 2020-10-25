
import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_PENDING,
    USER_LOGIN_SUCCESS,
    SIGNUP_USER_FAILURE,
    SIGNUP_USER_PENDING,
    SIGNUP_USER_SUCCESS,
    FETCH_USER_PENDING,
    FETCH_USER_SUCCESS,
    USER_LOGOUT
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    signup: {
        success: false,
        pending: true,
        error: {}
    },
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
            userLoading: true
        };
    case USER_LOGIN_PENDING:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_USER_SUCCESS:
        return {
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
            user: { ...payload.data.user },
            isAuthorised: true,
            isLoading: false,
            error: {}
        };
    case USER_LOGIN_FAILURE:
        return {
            ...state,
            user: {},
            isAuthorised: false,
            isLoading: false,
            error: {
                message: payload.messages.error
            }
        };
    case SIGNUP_USER_FAILURE:
        return {
            ...state,
            signup: {
                success: false,
                pending: false,
                error: {
                    ...payload.messages
                }
            }
        };
    case SIGNUP_USER_PENDING:
        return {
            ...state,
            signup: {
                success: false,
                error: {},
                pending: true
            }
        };
    case SIGNUP_USER_SUCCESS:
        return {
            ...state,
            signup: {
                success: true,
                pending: false,
                error: {}
            }
        };
    case USER_LOGOUT:
        return {
            ...state,
            ...INITIAL_STATE
        };
    default:
        return state;
    }
};
