import React, {useState, ChangeEvent, KeyboardEvent, useCallback} from 'react';
import {tasksType, filterTaskType} from './App';
import {AddIemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton, Button, Checkbox, Grid, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


type PropsType = {
    id: string
    title: string
    tasks: Array<tasksType>
    filter: filterTaskType
    removeTodoLost: (TodolistID: string) => void
    deleteTask: (id: string, TodolistID: string) => void
    addTask: (valueInput: string, TodolistID: string) => void
    changeFilter: (value: filterTaskType, TodolistID: string) => void
    changeStatus: (id: string, isDone: boolean, TodolistID: string) => void
    changeTaskTitle: (id: string, title: string, TodolistID: string) => void
    changeTodoListTitle: (title: string, TodolistID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])
    const removeTodoLostBTN = useCallback(() => {
        props.removeTodoLost(props.id)
    }, [props.id, props.removeTodoLost])

    const onAllClickHandler= useCallback(() => {props.changeFilter('all', props.id) }, [props.changeFilter, props.id]);
    const onActiveClickHandler =useCallback(() => {props.changeFilter('active', props.id) }, [props.changeFilter, props.id]);
    const onCompletedClickHandler =useCallback(() => {props.changeFilter('completed', props.id) }, [props.changeFilter, props.id]);

    let tasksForTodo:Array<tasksType> = props.tasks;
    if (props.filter === 'active') {
        tasksForTodo = tasksForTodo.filter(t => t.isDone === true)
    }
    if (props.filter === 'completed') {
        tasksForTodo = tasksForTodo.filter(t => t.isDone === false)
    }

    const changeStatus = (taskId:string, check:boolean) => {
        props.changeStatus(taskId, check, props.id)
    }
    const changeTaskTitle = (taskId:string, title: string) => {
        props.changeTaskTitle(taskId, title, props.id)
    }

    const removeTask = (taskId: string) => {
        props.deleteTask(taskId, props.id)
    };

    return (

        <div className="todoList">
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                {/* {props.title} */}
                {/* <button onClick={removeTodoLostBTN}>X</button> */}
                <IconButton onClick={removeTodoLostBTN}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddIemForm addItem={addTask}/>
            <ul>
                {tasksForTodo.map(t => {

                    // const changeTaskTitle = useCallback((title: string) => {
                    //     props.changeTaskTitle(t.id, title, props.id)
                    // },[props.id,props.changeTaskTitle])

                    return (
                        <Task key={t.id} task={t} changeStatus={changeStatus} changeTaskTitle={changeTaskTitle} removeTask={removeTask}/>
                    )
                })}
            </ul>
            <div>
                <Button color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={onAllClickHandler}
                        variant={props.filter === "all" ? "contained" : "text"}> All
                </Button>
                <Button color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={onActiveClickHandler}
                        variant={props.filter === "active" ? "contained" : "text"}>Active
                </Button>
                <Button color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={onCompletedClickHandler}
                        variant={props.filter === "completed" ? "contained" : "text"}>Completed
                </Button>
            </div>
        </div>

    )
})
