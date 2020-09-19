import {
    TOGGLE_SIDE_NAV
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    sideNavOpen: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case TOGGLE_SIDE_NAV:
        return {
            ...state,
            sideNavOpen: !state.sideNavOpen
        };
    default:
        return state;
    }
};
