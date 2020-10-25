import {
    FETCH_ORGANIZATION_INFO_FAILURE,
    FETCH_ORGANIZATION_INFO_PENDING,
    FETCH_ORGANIZATION_INFO_SUCCESS,
    USER_LOGOUT
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    info: {},
    isLoading: false,
    error: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case FETCH_ORGANIZATION_INFO_SUCCESS:
        return {
            ...state,
            ...state,
            isLoading: false,
            error: {},
            info: payload.data
        };
    case FETCH_ORGANIZATION_INFO_PENDING:
        return {
            ...state,
            ...state,
            isLoading: true
        };
    case FETCH_ORGANIZATION_INFO_FAILURE:
        return {
            ...state,
            ...state,
            isLoading: false,
            error: payload.data
        };
    case USER_LOGOUT:
        return INITIAL_STATE;
    default:
        return state;
    }
};
