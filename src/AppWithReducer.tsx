import React, {useReducer} from 'react';
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
    ChangeTodoListFilterAC,
    RemuveTodoListAC,
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


export type todoListsType = {
    id: string
    title: string
    filter: filterTaskType
}
export type filterTaskType = "all" | "active" | "completed";

function AppWithReducer() {
    let todoList1 = v1();
    let todoList2 = v1();
    let todoList3 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(TodoListReducer,[
        {id: todoList1, title: "some name", filter: "all"},
        {id: todoList2, title: "first name", filter: "all"},
        {id: todoList3, title: "last name", filter: "all"}
    ])
    let [tasks, dispatchTask] = useReducer(TaskReducer,{
        [todoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoList3]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })

    function deleteTask(taskID: string, todolistID: string) {
        // let todoList = tasks[todolistID];
        // tasks[todolistID] = todoList.filter(t => t.id != taskID);
        dispatchTask(RemuveTaskAC(taskID,todolistID));
    }
    function addTask(taskName: string, todolistID: string) {
        // let newTask = {id: v1(), title: taskName, isDone: false};
        // let todoList = tasks[todolistID];
        // tasks[todolistID] = [newTask, ...todoList];
        dispatchTask(AddTaskAC(taskName,todolistID));
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        // let todoList = tasks[todolistID];
        // let task = todoList.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        // }
        dispatchTask(ChangeTaskStatusAC(taskId,isDone,todolistId));
    }
    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        // let todoList = tasks[todolistID];
        // let task = todoList.find(t => t.id === id)
        // if (task) {
        //     task.title = title
        // }
        // setTask({...tasks})
        dispatchTask(ChangeTaskTitleAC(taskId,title,todolistId))
    }
    function changeFilter(value: filterTaskType, todolistID: string) {
        dispatchTodoLists(ChangeTodoListFilterAC(value,todolistID));
    }
    function removeTodoLost(todolistID: string) {
        dispatchTodoLists(RemuveTodoListAC(todolistID));
    }
    function addTodoList(title: string) {
        dispatchTodoLists(AddTodoListAC(title));
        dispatchTask(AddTodoListAC(title))
    }
    function changeTodoListTitle(todolistID: string, newTitle: string) {
        dispatchTodoLists(ChangeTodoListAC(newTitle,todolistID));
    }

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

                        let taskForTodo = tasks[tl.id];
                        if (tl.filter === 'active') {
                            taskForTodo = tasks[tl.id].filter(t => t.isDone === true)
                        }
                        if (tl.filter === 'completed') {
                            taskForTodo = tasks[tl.id].filter(t => t.isDone === false)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "7px 15px"}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        tasks={taskForTodo}
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

export default AppWithReducer;
