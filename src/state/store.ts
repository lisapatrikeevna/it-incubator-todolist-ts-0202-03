import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./TasksRreducer";
import {TodoListReducer} from "./TodoListRreducer";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todoList: TodoListReducer,
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// window.store = store;