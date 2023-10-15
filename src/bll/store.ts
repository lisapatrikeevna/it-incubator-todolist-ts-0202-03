import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import {tasksReducer} from "./tasksReduser";
import {todoReducer} from "./todoReduser";

const rootReducer = combineReducers({
    listTasks: tasksReducer,
    listTodo: todoReducer,
});

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;