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
    CREATE_BOARD_FAILURE
} from "../constants/ActionTypes";


const INITIAL_STATE = {
    activeBoard: {
        task_lists: []
    },
    boards: [],
    error: {},
    isLoading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case CREATE_BOARD_PENDING:
        return {
            ...state,
            ...state,
            isLoading: true
        };
    case CREATE_BOARD_SUCCESS:
        return {
            ...state,
            ...state,
            isLoading: false,
            activeBoard: payload.data,
            boards: [
                ...state.boards,
                payload.data
            ],
            error: {}
        };
    case CREATE_BOARD_FAILURE:
        return {
            ...state,
            ...state,
            isLoading: false,
            error: payload.data
        };
    case FETCH_BOARDS_PENDING:
        return {
            ...state,
            ...state,
            isLoading: true
        };
    case FETCH_BOARDS_SUCCESS:
        return {
            ...state,
            ...state,
            isLoading: false,
            boards: payload.data,
            error: {}
        };
    case FETCH_BOARDS_FAILURE:
        return {
            ...state,
            ...state,
            isLoading: false,
            error: {
                message: payload.message
            }
        };
    case FETCH_TASKLIST_SUCCESS:
        return {
            ...state,
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
        console.log("payload", payload);
        return {
            ...state,
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_list: [
                    ...state.activeBoard.task_list,
                    payload.data
                ]
            }
        };
    case NEW_TASK_SUCCESS:
        return {
            ...state,
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_list: state.activeBoard.task_list.map((taskList) => {
                    if (taskList.id === payload.data.task_list) {
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
        const listToSwap = state.activeBoard.task_list.filter((task) => task.id === payload.id)[0];
        const toList = state.activeBoard.task_list.filter((task) => task.id !== payload.id);
        return {
            ...state,
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_list: [
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
        state.activeBoard.task_list.map((taskList) => {
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
        const fromList = state.activeBoard.task_list.map((taskList) => {
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
            ...state,
            activeBoard: {
                ...state.activeBoard,
                task_list: updatedList
            }
        };

    case CHANGE_ACTIVE_BOARD_SUCCESS:
        console.log(payload);
        return {
            ...state,
            ...state,
            activeBoard: payload.data
        };
    default:
        return state;
    }
};
