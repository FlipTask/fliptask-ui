import {
    CREATE_NEW_TEAM_FAILURE,
    CREATE_NEW_TEAM_SUCCESS,
    CREATE_BOARD_PENDING,
    FETCH_TEAMS_FAILURE,
    FETCH_TEAMS_PENDING,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMINFO_FAILURE,
    FETCH_TEAMINFO_SUCCESS,
    FETCH_BOARDINFO_PENDING,
    FETCH_TEAMINFO_PENDING
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
        return true;
    } catch (e) {
        dispatch({
            type: CREATE_NEW_TEAM_FAILURE,
            payload: e.response.data
        });
        return false;
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
                include: "members",
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

export const getTeam = (id) => async (dispatch, getState, { api }) => {
    try {
        dispatch({ type: FETCH_TEAMINFO_PENDING });
        const res = await api.get(`/team/${id}`, {
            params: {
                include: "members"
            }
        });
        dispatch({
            type: FETCH_TEAMINFO_SUCCESS,
            payload: res.data.data
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: FETCH_TEAMINFO_FAILURE,
                payload: error.response.data
            });
        }
    }
}