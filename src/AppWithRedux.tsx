import React, {useCallback, useEffect, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddIemForm} from './AddItemForm';
import {AppBar, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListAC,
    ChangeTodoListFilterAC, GetTodoListsTC,
    RemuveTodoListAC, SetTodoListsAC,
    TodoListReducer
} from "./state/TodoListRreducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemuveTaskAC,
    TaskReducer,
    taskStateType
} from "./state/TasksRreducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todolistAPI} from "./Api/todolistApi";


export type todoListsType = {
    id: string
    title: string
    filter: filterTaskType
}
export type filterTaskType = "all" | "active" | "completed";

function AppWithRedux() {
    let todoList1 = v1();
    let todoList2 = v1();
    let todoList3 = v1();
    const tasks = useSelector<AppRootStateType,taskStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType,Array<todoListsType>>(state => state.todoList);
    const  dispatch = useDispatch();

    useEffect(()=>{
            dispatch(GetTodoListsTC())
    },[])

    const deleteTask= useCallback((taskID: string, todolistID: string) =>{
        dispatch(RemuveTaskAC(taskID,todolistID));
    },[dispatch])
    const addTask=useCallback((taskName: string, todolistID: string) => {
        dispatch(AddTaskAC(taskName,todolistID))
    },[])
    const changeStatus= useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(taskId,isDone,todolistId));
    },[])
    const changeTaskTitle= useCallback((taskId: string, title: string, todolistId: string) =>{
        dispatch(ChangeTaskTitleAC(taskId,title,todolistId))
    },[])
    const changeFilter= useCallback((value: filterTaskType, todolistID: string) => {
        dispatch(ChangeTodoListFilterAC(value,todolistID));
    },[])
    const removeTodoLost= useCallback((todolistID: string) =>{
        dispatch(RemuveTodoListAC(todolistID));
    },[])
    const addTodoList= useCallback((title: string) => {
        dispatch(AddTodoListAC(title));
       //
        // dispatch(AddTodoListAC(title))
    },[])
    const changeTodoListTitle= useCallback((todolistID: string, newTitle: string)=> {
        dispatch(ChangeTodoListAC(newTitle,todolistID));
    },[])

    return(
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        My lists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            < Container maxWidth="md" style={{padding: "10px"}}>
                <Grid container>
                    <div className="mainInput"><AddIemForm addItem={addTodoList}/></div>
                </Grid>
                <Grid container spacing={3}>
                    {/* <div className="wrapTodolist"> */}
                    {todoLists.map(tl => {
                        let tasksForTodo= tasks[tl.id];
                        return (
                            <Grid item>
                                <Paper style={{padding: "7px 15px"}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        tasks={tasksForTodo}
                                        deleteTask={deleteTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        removeTodoLost={removeTodoLost}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                    {/* </div> */}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
