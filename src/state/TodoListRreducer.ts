import {filterTaskType, todoListsType} from "../App";
import {v1} from "uuid";
import {todolistAPI} from "../Api/todolistApi";
import {Dispatch} from "redux";

type ActionType = RemuveTodoListActionType | AddTodoLIstActionType | ChangeTodoLIstActionType |
    ChangeTodoLIstFilterActionType | SetTodoListsACType

export  type RemuveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type SetTodoListsACType = ReturnType<typeof SetTodoListsAC>
export type AddTodoLIstActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoLIstActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoLIstFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterTaskType
    id: string
}

let initialState: Array<todoListsType> = [];

export const TodoListReducer = (state: Array<todoListsType> = initialState, action: ActionType): Array<todoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList: todoListsType = {
                id: action.todolistId,
                filter: 'all',
                title: action.title
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state];
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todoListFiltred = state.find(tl => tl.id === action.id);
            if (todoListFiltred) {
                todoListFiltred.filter = action.filter;
                return [...state];
            }
            return state;
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        default :
            return state
    }
}

export const RemuveTodoListAC = (todoLisID: string): RemuveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoLisID}
}
export const AddTodoListAC = (title: string): AddTodoLIstActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodoListAC = (title: string, todoLisID: string): ChangeTodoLIstActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoLisID}
}
export const ChangeTodoListFilterAC = (filter: filterTaskType, todoLisID: string): ChangeTodoLIstFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoLisID}
}
export const SetTodoListsAC = (todoLists: Array<todoListsType>) => {
    return {type: "SET-TODOLISTS", todoLists} as const
}


export const GetTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((response) => {
            debugger
            dispatch(SetTodoListsAC(response.data))
        })
}

