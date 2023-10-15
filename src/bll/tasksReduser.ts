import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {ArrTasksType, TaskType} from "../ui/myTypes";

type initialStateType = {
    tasks: ArrTasksType

}
const tasks = {
    ['todo0']: [
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'React-native', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    ['todo1']: [
        {id: v1(), title: 'learn it', isDone: false},
        {id: v1(), title: 'new word', isDone: true},
        {id: v1(), title: 'native js', isDone: false},
        {id: v1(), title: 'codevars', isDone: false},
    ],
    ['todo2']: [
        {id: v1(), title: 'meet', isDone: false},
        {id: v1(), title: 'tomate', isDone: true},
        {id: v1(), title: 'freash-creame', isDone: false},
        {id: v1(), title: 'majonez', isDone: true},
        {id: v1(), title: 'kat', isDone: false},
    ],
}
let initialState: initialStateType = {
    tasks: tasks
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksAC: (state,
                     action: PayloadAction<ArrTasksType>) => {
            state.tasks = action.payload
        },
        addTaskAC: (state, action: PayloadAction<{ title: string, idTodo: string }>) => {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            state.tasks = {...state.tasks,
                [action.payload.idTodo]: [newTask, ...state.tasks[action.payload.idTodo]]
            }
        },
        removeTaskAC: (state, action: PayloadAction<{ idTodo: string, id: string }>) => {
            const listTask = state.tasks[action.payload.idTodo].filter(t => t.id != action.payload.id)
            state.tasks = {...state.tasks, [action.payload.idTodo]: listTask}
        },
        removeListTaskAC: (state, action: PayloadAction<{ idTodo: string }>) => {
            // delete state.tasks[action.payload.idTodo]
            if (state.tasks.hasOwnProperty(action.payload.idTodo)) {
                delete state.tasks[action.payload.idTodo];
            } else {
                console.log("Задача не найдена в состоянии."); // Обработайте случай, если задача не существует
            }
        },
        correctTaskTitleAC: (state, action: PayloadAction<{
            idTodo: string,
            id: string,
            title: string
        }>) => {
            const currentListTask = state.tasks[action.payload.idTodo]
            const listTask = currentListTask.map(i => i.id !== action.payload.id ? i : {
                ...i,
                title: action.payload.title
            })
            // console.log("listTask", JSON.stringify(listTask,null,2));
            state.tasks = {...state.tasks, [action.payload.idTodo]: listTask}
        },
        changeTaskStatusAC: (state, action: PayloadAction<{
            idTodo: string,
            id: string,
            isDone: boolean
        }>) => {
            const currentListTask = state.tasks[action.payload.idTodo]
            const listTask = currentListTask.map(i => i.id !== action.payload.id ? i : {
                ...i,
                isDone: action.payload.isDone
            })
            state.tasks = {...state.tasks, [action.payload.idTodo]: listTask}
        },
        // setErrorAC: (state, action: PayloadAction<{ error: string}>) => {
        //     state.error = action.payload.error
        // },

    }
})


export const tasksReducer = slice.reducer
export const tasksReducerActions = slice.actions
// export const isLoggedInActions = slice.actions
export const tasksAC = slice.actions


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

