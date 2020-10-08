import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {TodoListReducer} from "../state/TodoListRreducer";
import {TaskReducer} from "../state/TasksRreducer";
import {AppRootStateType} from "../state/store";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todoList: TodoListReducer
})

const initialGlobalState = {
    todoList: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

// export default {
//     title: 'Todolist/AppWithRedux',
//     component: AppWithRedux,
// };

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
};

