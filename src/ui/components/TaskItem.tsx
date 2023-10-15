import React, {ChangeEvent} from 'react';
import {Box, Checkbox, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from '../myTypes';
import EditableSpan from "./EditableSpan";
import cl from "./../Todo.module.css";

type PropsType = {
    task: TaskType
    handleChangeStatus: (idTask: string, isDone:boolean) => void
    removeTask: (idTask: string) => void
    correctTaskTitle: (value: string, idElem: string) => void
}

const TaskItem = ({task, ...props}: PropsType) => {


    const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let isDone = e.currentTarget.checked
        console.log(isDone);
        props.handleChangeStatus(task.id, isDone)
    };

    return (
        <Paper className={cl.taskItemWrap}>
            <Box className={cl.df}>
                <Checkbox checked={task.isDone} color="secondary"
                          onChange={handleChangeStatus}
                          inputProps={{'aria-label': 'controlled'}}
                />
                <EditableSpan title={task.title} idElem={task.id}
                              setCorrectedValue={props.correctTaskTitle}/>
            </Box>
            <IconButton aria-label="delete" onClick={() => props.removeTask(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </Paper>
    );
};

export default TaskItem;