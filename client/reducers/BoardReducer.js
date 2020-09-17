/* eslint-disable no-case-declarations */
import {
    FETCH_BOARDS_FAILURE,
    FETCH_BOARDS_PENDING,
    FETCH_BOARDS_SUCCESS,
    FETCH_TASKLIST_SUCCESS,
    NEW_TASK_SUCCESS,
    SWAP_TASK_CARD,
    SWAP_LIST_CARD_SUCCESS,
    CREATE_TASKLIST_SUCCESS,
    CHANGE_ACTIVE_BOARD_SUCCESS,
    CREATE_BOARD_PENDING,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE,
    USER_LOGOUT
} from "../constants/ActionTypes";


const INITIAL_STATE = {
    activeBoard: {
        task_lists: []
    },
    boards: {
        rows: [],
        page_size: 0,
        page: 0,
        limit: 0,
        count: 0
    },
    error: {},
    isLoading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case CREATE_BOARD_PENDING:
        return {
            ...state,
            isLoading: true
        };
    case CREATE_BOARD_SUCCESS:
        return {
            ...state,
            ...state,
            isLoading: false,
            activeBoard: payload.data,
            boards: {
                ...state.boards,
                rows: [
                    ...state.boards.rows,
                    payload.data
                ],
                count: state.bodard.count + 1
            },
            error: {}
        };
    case CREATE_BOARD_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: payload.data
        };
    case FETCH_BOARDS_PENDING:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_BOARDS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            boards: {
                ...payload.data,
                rows: [
                    ...state.boards.rows,
                    ...payload.data.rows
                ]
            },
            error: {}
        };
    case FETCH_BOARDS_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: {
                message: payload.message
            }
        };
    case FETCH_TASKLIST_SUCCESS:
        return {
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_lists: [
                    ...state.activeBoard.task_lists,
                    payload.data
                ]
            }
        };

    case CREATE_TASKLIST_SUCCESS:
        // console.log("payload", payload);
        return {
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_lists: [
                    ...state.activeBoard.task_lists,
                    payload.data
                ]
            }
        };
    case NEW_TASK_SUCCESS:
        return {
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_lists: state.activeBoard.task_lists.map((taskList) => {
                    if (taskList.id === payload.data.taskListId) {
                        return {
                            ...taskList,
                            tasks: taskList.tasks.filter((task) => task.id === payload.data.id).length > 0 ? taskList.tasks.map((task) => {
                                if (task.id === payload.data.id) {
                                    return payload.data;
                                }
                                return task;
                            }) : [
                                ...taskList.tasks,
                                payload.data
                            ]
                        };
                    }
                    return taskList;
                })
            }
        };
    case SWAP_LIST_CARD_SUCCESS:
        const listToSwap = state.activeBoard.task_lists.filter((task) => task.id === payload.id)[0];
        const toList = state.activeBoard.task_lists.filter((task) => task.id !== payload.id);
        return {
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_lists: [
                    ...toList.slice(0, payload.index),
                    listToSwap,
                    ...toList.slice(payload.index)
                ]
            }
        };

    case SWAP_TASK_CARD:
        const { to, from } = payload;
        let taskToReplace = {};
        // finding task
        state.activeBoard.task_lists.map((taskList) => {
            if (taskList.id === from.listid) {
                return {
                    ...taskList,
                    tasks: taskList.tasks.map((task) => {
                        if (task.id === from.taskid) {
                            taskToReplace = task;
                        }
                        return task;
                    })
                };
            }
            return taskList;
        });
        // remove task from list;
        const fromList = state.activeBoard.task_lists.map((taskList) => {
            if (taskList.id === from.listid) {
                return {
                    ...taskList,
                    tasks: taskList.tasks.filter((task) => task.id !== from.taskid)
                };
            }
            return taskList;
        });

        // add task into list at provided index:
        const updatedList = fromList.map((taskList) => {
            if (taskList.id === to.listid) {
                return {
                    ...taskList,
                    tasks: [
                        ...taskList.tasks.slice(0, to.index),
                        taskToReplace,
                        ...taskList.tasks.slice(to.index)
                    ]
                };
            }
            return taskList;
        });
        return {
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_lists: updatedList
            }
        };

    case CHANGE_ACTIVE_BOARD_SUCCESS:
        return {
            ...state,
            activeBoard: payload.data
        };
    case USER_LOGOUT:
        return INITIAL_STATE;
    default:
        return state;
    }
};
