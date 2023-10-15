import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {FilterType, TaskType, TodosType} from "../ui/myTypes";
import {useState} from "react";
import totolist from "../ui/Totolist";

const todoList:Array<TodosType> = [
    {idTodo: 'todo0', title: 'What to learn', filter: "ALL" },
    {idTodo: 'todo1', title: 'JS', filter: "ALL" },
    {idTodo: 'todo2', title: 'what to bye', filter: "COMPLETED"},
]
type initialStateType = {
    todoList: Array<TodosType>
    // todoList:Array<any>
    // filterValue: FilterType
}
let initialState: initialStateType = {
    todoList: todoList,
    // filterValue: "ALL",


}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTodoAC: (state,
                    action: PayloadAction<Array<TodosType>>) => {
            // action: PayloadAction<Array<any>>) => {
            state.todoList = action.payload
        },
        changeFilterAC: (state, action: PayloadAction<{idTodo:string,filter: FilterType }>) => {
            state.todoList=state.todoList.map(t=>t.idTodo? {...t, filter:action.payload.filter}: t)
        },
        addTodoAC: (state, action: PayloadAction<{idTodo:string,title:string}>) => {
            state.todoList= [...state.todoList, {idTodo:action.payload.idTodo, title:action.payload.title,filter:"ALL"}]
        },
        removeTodoAC: (state, action: PayloadAction<{ idTodo: string }>) => {
            state.todoList=state.todoList.filter(t=>t.idTodo!==action.payload.idTodo)
        },
        correctTodoTitleAC: (state, action: PayloadAction<{value:string ,idTodo:string}>) => {
            // console.log("correctTodoTitle",todoList.map(t=>t.idTodo !==action.payload.idTodo? t: {...t, title:action.payload.value}))

                state.todoList=state.todoList.map(t=>t.idTodo !==action.payload.idTodo? t: {...t, title:action.payload.value})
            },
        // clearErrAC: (state, action: PayloadAction<{ }>) => {
        //     state.error = null
        // },
        // setErrorAC: (state, action: PayloadAction<{ error: string}>) => {
        //     state.error = action.payload.error
        // },

    }
})


export const todoReducer = slice.reducer
export const todoListReducerActions = slice.actions
// export const isLoggedInActions = slice.actions
// export const appAC = slice.actions


// type registrationType = ReturnType<typeof registrationAC>

export const registrationTC = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        // registrationAC(email, password)
        // RegistrationApi.setUser(email,password).then(res=>{
        //     console.log(res.data);
        // } ) .catch((err) => {
        //     let message=err.response ? err.response.data.errorText : err.message
        //     console.log(err.response ? err.response.data.errorText : err.message);
        //     // dispatch(answerRequestAC(message))
        // })
    }
}
export const authTC = (isLoggedIn: boolean) => (dispatch: Dispatch) => {
// export const authTC = (data:isLoggedInACType) => (dispatch: Dispatch) => {
//         dispatch(isLoggedInActions.setIsLoggedInAC({isLoggedIn}))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    const isLoggedIn = false
    // dispatch(isLoggedInActions.setIsLoggedInAC({isLoggedIn}))
}

