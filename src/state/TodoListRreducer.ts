import {filterTaskType, todoListsType} from "../App";
import {v1} from "uuid";

type ActionType = RemuveTodoListActionType|AddTodoLIstActionType|ChangeTodoLIstActionType|ChangeTodoLIstFilterActionType

export  type RemuveTodoListActionType  = {
    type: 'REMOVE-TODOLIST' ,
    id: string
}
export type AddTodoLIstActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoLIstActionType= {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoLIstFilterActionType= {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterTaskType
    id: string
}

export const TodoListReducer= (state: Array<todoListsType>, action:ActionType )=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList:todoListsType ={
                id:v1(),
                filter:'all',
                title: action.title
            }
            return [...state,newTodoList]
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
        default :
             return state
    }
}

export const RemuveTodoListAC = (todoLisID: string): RemuveTodoListActionType => {return {type: 'REMOVE-TODOLIST', id: todoLisID}}