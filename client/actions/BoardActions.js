import {
    FETCH_BOARDS_FAILURE,
    FETCH_BOARDS_PENDING,
    FETCH_BOARDS_SUCCESS,
    SWAP_TASK_CARD,
    SWAP_LIST_CARD_FAILURE,
    SWAP_LIST_CARD_PENDING,
    SWAP_LIST_CARD_SUCCESS,
    CREATE_TASKLIST_FAILURE,
    CREATE_TASKLIST_PENDING,
    CREATE_TASKLIST_SUCCESS,
    CHANGE_ACTIVE_BOARD_FAILURE,
    CHANGE_ACTIVE_BOARD_PENDING,
    CHANGE_ACTIVE_BOARD_SUCCESS,
    CREATE_BOARD_PENDING,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE
} from "../constants/ActionTypes";

export const fetchBoards = (page = 1, limit = 5) => async (dispatch, getState, { api }) => {
    const workspace = getState().boards.boards;
    if (workspace.page === page) {
        return;
    }
    try {
        dispatch({ type: FETCH_BOARDS_PENDING });
        const res = await api.get("/workspace", {
            params: {
                include: "task_lists",
                page,
                limit
            }
        });
        if (res) {
            await dispatch({
                type: FETCH_BOARDS_SUCCESS,
                payload: res.data
            });
        }
    } catch (e) {
        dispatch({
            type: FETCH_BOARDS_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
    }
};

export const swapTaskCard = ({ from, to }) => async (dispatch) => {
    dispatch({
        type: SWAP_TASK_CARD,
        payload: {
            from,
            to
        }
    });
};

export const swapTaskList = (boardId, to = {}) => async (dispatch, getState, { api }) => {
    dispatch({
        type: SWAP_LIST_CARD_PENDING
    });
    try {
        const res = await api.post(`/board/update/${boardId}`, {
            at_index: to.index,
            task_listid: to.id
        });
        dispatch({
            type: SWAP_LIST_CARD_SUCCESS,
            payload: to
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: SWAP_LIST_CARD_FAILURE,
            payload: e.message ? {} : e.response.data
        });
    }
};

export const createNewTaskList = (tasklist = {}) => async (dispatch, getState, { api }) => {
    dispatch({ type: CREATE_TASKLIST_PENDING });
    try {
        const res = await api.post("/task-list", {
            name: tasklist.title,
            workspaceId: tasklist.board
        });
        dispatch({ type: CREATE_TASKLIST_SUCCESS, payload: res.data });
        return true;
    } catch (e) {
        console.log(e);
        dispatch({
            type: CREATE_TASKLIST_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
        return false;
    }
};

export const getTaskListById = (id) => async (dispatch, getState, { api }) => {
    try {
        const res = await api.get(`/task-list/${id}?include=tasks`);
        return res.data;
    } catch (e) {
        return e.response.data;
    }
};

export const changeActiveBoard = (boardId) => async (dispatch, getState, { api }) => {
    dispatch({
        type: CHANGE_ACTIVE_BOARD_PENDING
    });
    try {
        const res = await api.get(`/workspace/${boardId}?include=task_lists`);
        if (!res.data.error) {
            const response = await Promise.all(res.data.data.task_lists.map((taskList) => dispatch(getTaskListById(taskList.id))));
            await dispatch({
                type: CHANGE_ACTIVE_BOARD_SUCCESS,
                payload: {
                    ...res.data,
                    data: {
                        ...res.data.data,
                        task_lists: response.map((r) => r.data)
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: CHANGE_ACTIVE_BOARD_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
        return false;
    }
};

export const createNewBoard = (title) => async (dispatch, getState, { api }) => {
    try {
        dispatch({ type: CREATE_BOARD_PENDING });
        const res = await api.post("/workspace", {
            name: title
        });
        dispatch({
            type: CREATE_BOARD_SUCCESS,
            payload: res.data
        });
        return res.data;
    } catch (e) {
        console.log(e);
        dispatch({
            type: CREATE_BOARD_FAILURE,
            payload: e.response.data
        });
        return e.response.data;
    }
};
