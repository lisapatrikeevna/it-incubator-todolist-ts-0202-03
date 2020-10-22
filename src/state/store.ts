import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducer} from "./TasksRreducer";
import {TodoListReducer} from "./TodoListRreducer";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    tasks: TaskReducer,
    todoList: TodoListReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// window.store = store;