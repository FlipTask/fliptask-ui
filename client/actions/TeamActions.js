import {
    CREATE_NEW_TEAM_FAILURE,
    CREATE_NEW_TEAM_SUCCESS,
    CREATE_BOARD_PENDING,
    FETCH_TEAMS_FAILURE,
    FETCH_TEAMS_PENDING,
    FETCH_TEAMS_SUCCESS
} from "../constants/ActionTypes";

export const createNewTeam = (data = {}) => async (dispatch, getState, { api }) => {
    dispatch({ type: CREATE_BOARD_PENDING });
    try {
        const res = await api.post("/team", {
            ...data
        });
        dispatch({
            type: CREATE_NEW_TEAM_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: CREATE_NEW_TEAM_FAILURE,
            payload: e.response.data
        });
    }
};

export const getAllTeams = (page = 1, limit = 5) => async (dispatch, getState, { api }) => {
    const teams = getState().team;
    if (teams.teams.page === page) {
        return;
    }
    dispatch({ type: FETCH_TEAMS_PENDING });
    try {
        const res = await api.get("/team", {
            params: {
                page,
                limit
            }
        });
        if (res) {
            dispatch({
                type: FETCH_TEAMS_SUCCESS,
                payload: res.data
            });
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: FETCH_TEAMS_FAILURE,
            payload: e.response.data
        });
    }
};
