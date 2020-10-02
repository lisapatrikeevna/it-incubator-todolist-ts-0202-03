import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {tasksType} from "./App";

export type propsTask = {
    task:tasksType
    changeStatus:(taskId:string, check:boolean)=>void
    changeTaskTitle:(taskId: string, newValue: string)=>void
    removeTask:(taskId:string)=>void
}
export const Task = React.memo( (props:propsTask)=>{
    const {task,changeStatus,changeTaskTitle,removeTask}=props

    const changeStatusTask=(e: ChangeEvent<HTMLInputElement>)=> changeStatus(task.id,e.currentTarget.checked)
    const changeTitleTask=(newValue:string)=>changeTaskTitle(task.id,newValue)
    const remove=()=>removeTask(task.id)
    return(
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            {/*<input type="checkbox" checked={t.isDone} onChange={changeStatus}/>*/}
            <Checkbox checked={task.isDone} onChange={changeStatusTask}/>
            <EditableSpan value={task.title} changeValue={changeTitleTask}/>
            <IconButton onClick={remove}><Delete/></IconButton>
        </li>
    )
})