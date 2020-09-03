import React, { useState, ChangeEvent,KeyboardEvent } from 'react';
import { tasksType ,filterTaskType} from './App';
import { AddIemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import {IconButton, Button, Checkbox,Grid,Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    id: string
    title: string
    tasks: Array<tasksType>
    filter: filterTaskType
    removeTodoLost: (TodolistID:string) =>void
    deleteTask: (id:string,TodolistID:string)=>void
    addTask: (valueInput:string,TodolistID:string) => void
    changeFilter : (value:filterTaskType,TodolistID:string) => void
    changeStatus: (id:string ,isDone: boolean,TodolistID:string)=> void
    changeTaskTitle: (id:string ,title: string,TodolistID:string)=> void
    changeTodoListTitle: (title: string,TodolistID:string) =>void
}

export function Todolist(props: PropsType) {
    
    const addTask = (title: string)=>{ props.addTask(title, props.id)}
    const changeTodoListTitle = (title:string)=>{
        props.changeTodoListTitle(props.id, title)

    }
    const removeTodoLostBTN=()=>{props.removeTodoLost(props.id)}
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
            <AddIemForm  addItem={addTask}/>
                <ul>
                    {props.tasks.map( t=>{
                        const removeTask = ()=>{props.deleteTask(t.id, props.id)};
                        const changeStatus = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title:string) =>{
                            props.changeTaskTitle(t.id,title,props.id)
                        }
                        return(
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                {/*<input type="checkbox" checked={t.isDone} onChange={changeStatus}/>*/}
                                <Checkbox checked={t.isDone} onChange={changeStatus}/>
                                <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                                <IconButton onClick={removeTask}><Delete/></IconButton>
                            </li>
                        )
                        })}
                </ul>
                <div>
                    {/* <button onClick={()=>{props.changeFilter('all',props.id)}}>All</button>
                    <button onClick={()=>{props.changeFilter('active',props.id)}}>Active</button>
                    <button onClick={()=>{props.changeFilter('completed',props.id)}}>Completed</button> */}
                    <Button color={props.filter === "all" ? "secondary" : "primary"} onClick={()=>{props.changeFilter('all',props.id)}} variant={props.filter === "all" ? "contained" : "text"}>
                    All
                    </Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"} onClick={()=>{props.changeFilter('active',props.id)}} variant={props.filter === "active" ? "contained" : "text"}>
                    Active
                    </Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"} onClick={()=>{props.changeFilter('completed',props.id)}} variant={props.filter === "completed" ? "contained" : "text"}>
                    Completed
                    </Button>
                </div>
            </div>
        
    )
}
