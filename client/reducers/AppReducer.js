import {
    TOGGLE_SIDE_NAV,
    TOGGLE_THEME
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    sideNavOpen: false,
    theme: "day"
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case TOGGLE_SIDE_NAV:
        return {
            ...state,
            sideNavOpen: !state.sideNavOpen
        };
    case TOGGLE_THEME:
        return {
            ...state,
            theme: payload
        };
    default:
        return state;
    }
};
