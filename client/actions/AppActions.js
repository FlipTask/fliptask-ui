import {
    TOGGLE_SIDE_NAV
} from "../constants/ActionTypes";

export const toggleSideNav = () => async(dispatch) => {
    dispatch({
        type: TOGGLE_SIDE_NAV
    })
};