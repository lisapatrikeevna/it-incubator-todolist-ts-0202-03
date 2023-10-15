import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {TaskType} from "../ui/myTypes";

type initialStateType={


}

let initialState: initialStateType = {
    // tasks:tasks
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksAC: (state,
                          action: PayloadAction<Array<TaskType>>) => {
            // state.tasks = action.payload
        },
        addTaskAC:(state,action:PayloadAction)=>{},
        removeTaskAC:(state,action:PayloadAction)=>{},
        correctTaskTitleAC:(state,action:PayloadAction)=>{},
        // clearErrAC: (state, action: PayloadAction<{ }>) => {
        //     state.error = null
        // },
        // setErrorAC: (state, action: PayloadAction<{ error: string}>) => {
        //     state.error = action.payload.error
        // },

    }
})


export const appReducer = slice.reducer
export const appReducerActions = slice.actions
// export const isLoggedInActions = slice.actions
export const appAC = slice.actions



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

