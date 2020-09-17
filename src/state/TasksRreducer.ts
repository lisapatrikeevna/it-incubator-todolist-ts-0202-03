import { taskStateType, tasksType} from "../App";
import {v1} from "uuid";
import {AddTodoLIstActionType, RemuveTodoListActionType} from "./TodoListRreducer";

type ActionType = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|ChangeTaskTitleActionType|AddTodoLIstActionType|RemuveTodoListActionType;

export  type RemoveTaskActionType  = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId:string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string
}
export type ChangeTaskStatusActionType= {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType= {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title:string
    todolistId: string
}


export const TaskReducer= (state: taskStateType, action:ActionType )=>{
    switch (action.type) {
        case 'REMOVE-TASK':
            const tasks = [...state[action.todolistId]]
            const filteredTasks= tasks.filter(t => t.id != action.taskId);
            return {...state,tasks: filteredTasks }
        case 'ADD-TASK':
            let task:tasksType ={id:v1(),isDone: false,title: action.title }
            let todoListTasks = [...state[action.todolistId]];
            todoListTasks = [task,...todoListTasks]
            return {...state,todoListTasks }
        case 'CHANGE-TASK-STATUS':
            return  {...state, [action.todolistId]: state[action.todolistId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, isDone: action.isDone}
                        }
                    })}
        case 'CHANGE-TASK-TITLE':
            return  {...state, [action.todolistId]: state[action.todolistId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, title: action.title}
                        }
                    })}
        case 'ADD-TODOLIST':
            return{
                ...state,
                [action.todolistId]:[]
            }
        case 'REMOVE-TODOLIST':
            return {
                ...state[action.id]
            }
        default :
             return state
    }
}

export const RemuveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {return {type: 'REMOVE-TASK', taskId:taskId, todolistId: todolistId }}
export const AddTaskAC = (title: string,todolistId: string): AddTaskActionType => {return {type: 'ADD-TASK', title: title,todolistId: todolistId}}
export const changeTaskStatusAC = (taskId: string,isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {return {type: 'CHANGE-TASK-STATUS',taskId ,isDone, todolistId }}
export const ChangeTaskTitleAC = (taskId: string,title:string, todolistId: string): ChangeTaskTitleActionType => {return {type: 'CHANGE-TASK-TITLE',taskId, title, todolistId }}