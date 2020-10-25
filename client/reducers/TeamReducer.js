import {
    CREATE_NEW_TEAM_FAILURE,
    CREATE_NEW_TEAM_SUCCESS,
    CREATE_NEW_TEAM_PENDING,
    FETCH_TEAMS_FAILURE,
    FETCH_TEAMS_PENDING,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMINFO_FAILURE,
    FETCH_TEAMINFO_PENDING,
    FETCH_TEAMINFO_SUCCESS,
    USER_LOGOUT
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    active: {
        members: []
    },
    teams: {
        rows: [],
        page_size: 0,
        page: 0,
        limit: 0,
        count: 0
    },
    isLoading: false,
    error: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case FETCH_TEAMS_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: {}
        };
    case FETCH_TEAMS_PENDING:
        return {
            ...state,
            isLoading: true,
            error: {}
        };
    case FETCH_TEAMS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: {},
            teams: {
                ...payload.data,
                rows: [
                    ...state.teams.rows,
                    ...payload.data.rows
                ]
            }
        };
    case CREATE_NEW_TEAM_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: {}
        };

    case CREATE_NEW_TEAM_PENDING:
        return {
            ...state,
            isLoading: true,
            error: {}
        };

    case CREATE_NEW_TEAM_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: {},
            teams: {
                ...state.teams,
                rows: [
                    ...state.teams.rows,
                    payload.data
                ],
                count: state.teams.count + 1
            }
        };
    case FETCH_TEAMINFO_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: {}
        };
    case FETCH_TEAMINFO_PENDING:
        // const team = state.teams.rows.filter(team => payload.data.id === team.id);
        return {
            ...state,
            isLoading: true,
            error: {},
            rows: state.teams.rows
        };
    case FETCH_TEAMINFO_SUCCESS:
        console.log(payload);
        return {
            ...state,
            isLoading: false,
            error: {},
            active: payload
        };
    case USER_LOGOUT:
        return INITIAL_STATE;
    default:
        return state;
    }
};
