import React, {ChangeEvent, MouseEventHandler, useState, MouseEvent} from 'react';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    Paper,
    TextField
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableSpan from "./components/EditableSpan";
import cl from "./Todo.module.css";
import {ArrTasksType, FilterType, TaskType, TodosType} from './myTypes';
import TaskItem from "./components/TaskItem";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {todoListReducerActions} from "../bll/todoReduser";
import {tasksReducerActions} from "../bll/tasksReduser";

type TodolistPropsType = {
    idTodo: string
    title: string
    // tasks: Array<TaskType>
    filter: FilterType
    // removeTask: (idTask: string) => void
    // handleChangeStatus: (idTask: string) => void
    // addTask: (text: string) => void
    // changeFilter: (value: FilterType) => void
    correctTodoTitle: (value: string, idElem: string) => void
    // correctTaskTitle: (value: string, idElem: string, idTodo: string) => void
}
const Totolist = ({idTodo,filter,...props}: TodolistPropsType) => {
    // color 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string
    const dispatch=useDispatch()
    const tasks=useSelector<AppRootStateType,ArrTasksType>(state => state.listTasks.tasks)

    // console.log(tasks[idTodo]);

    const [inputValue, setInputValue] = useState('')
   const removeTodo=()=>{
        dispatch(todoListReducerActions.removeTodoAC({idTodo}))
       dispatch(tasksReducerActions.removeListTaskAC({idTodo}))
   }
    const onChangeFilter = (e: MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        const filter = e.target.innerText;
        // changeFilter(value)
        dispatch(todoListReducerActions.changeFilterAC({idTodo, filter}))
    }
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const addNewTask = () => {
        // props.addTask(inputValue.trim())
        dispatch(tasksReducerActions.addTaskAC({title:inputValue.trim(), idTodo}))
        setInputValue('')
    }
    const removeTask = (idTask: string) => {
        // const filteredArr = tasks[idTodo].filter(t => t.id != idTask)
        // setTasks(filteredArr)
        dispatch(tasksReducerActions.removeTaskAC({idTodo,id:idTask}))
    }
    const handleChangeIsDone = (idTask: string, isDone:boolean) =>{
        // setTasks( tasks.map(t => t.id === idTask ? {...t,isDone:!t.isDone} :t) )
        dispatch(tasksReducerActions.changeTaskStatusAC({idTodo, id:idTask, isDone}))
        // console.log(e.currentTarget.checked);
    }
    const correctTaskTitle = (value: string, idElem: string,) => {
        // props.correctTaskTitle(value, idElem, props.id
        dispatch(tasksReducerActions.correctTaskTitleAC({idTodo,id:idElem,title:value}))
    }
    let resTasks = tasks[idTodo]
    if (filter === "COMPLETED") {
        resTasks = tasks[idTodo].filter(t => t.isDone)
    }
    if (filter === "ACTIVE") {
        resTasks = tasks[idTodo].filter(t => !t.isDone)
    }


    return (
        <Paper className={cl.wrapItemTodo}>
            <Box className={cl.df}>
            <EditableSpan title={props.title} idElem={'1'}
                          setCorrectedValue={props.correctTodoTitle}/>
                <IconButton aria-label="delete" onClick={removeTodo}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
            {/*<h3>{props.title}</h3>*/}
            <Box>
                <TextField label="title for new task" variant="outlined"
                           onChange={onChangeText} value={inputValue}/>
                <Button startIcon={<SendIcon/>} variant="contained" onClick={addNewTask}
                        style={{height: 55, marginLeft: 10}}>save</Button>
            </Box>
            <List>
                {resTasks.map(t => {
                    // const handleChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
                    //     let newValue=e.currentTarget.checked
                    //     console.log(newValue);
                    //     props.handleChangeStatus(t.id)
                    // };
                    return <ListItem key={t.id}>
                        {/*/!*<input type="checkbox" checked={t.isDone}/>*!/*/}
                        {/*<Checkbox checked={t.isDone} color="secondary"*/}
                        {/*    onChange={handleChangeStatus}*/}
                        {/*          inputProps={{'aria-label': 'controlled'}}*/}
                        {/*/>*/}
                        {/*/!*<Checkbox {...label} defaultChecked color="secondary" />*!/*/}
                        {/*<span>{t.title}</span>*/}
                        {/*<IconButton aria-label="delete" onClick={()=>removeTask(t.id)}>*/}
                        {/*    <DeleteIcon />*/}
                        {/*</IconButton>*/}
                        <TaskItem task={t}
                                  handleChangeStatus={handleChangeIsDone}
                                  // removeTask={()=>{}}
                                  removeTask={removeTask}
                                  correctTaskTitle={correctTaskTitle}/>
                    </ListItem>
                })}
            </List>
            <Box
                // sx={{display: 'flex', flexWrap: 'wrap',
                // '& > :not(style)': {m: 1, width: 330, height: 80, },}}
                className={cl.btnsWrap}
            >
                <Button variant="contained" onClick={onChangeFilter} size="small"
                        color={filter == 'ALL' ? 'primary' : 'secondary'}>All</Button>
                <Button variant="contained" onClick={onChangeFilter} size="small"
                        color={filter == 'ACTIVE' ? 'primary' : 'secondary'}>Active</Button>
                <Button variant="contained" onClick={onChangeFilter} size="small"
                        color={filter == 'COMPLETED' ? 'primary' : 'secondary'}>Completed</Button>
            </Box>
        </Paper>
    );
};

export default Totolist;