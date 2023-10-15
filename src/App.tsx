import React from 'react';
import './App.css';
import Totolist from "./ui/Totolist";
import { TodosType} from "./ui/myTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {todoListReducerActions} from "./bll/todoReduser";



///test commit
function App() {
    const dispatch=useDispatch()
    const todoList= useSelector<AppRootStateType,Array<TodosType>>(state => state.listTodo.todoList)
    // const filter=useSelector<AppRootStateType,FilterType>(state => state.listTodo.filterValue)

    // const addTask = (textTask: string) => {
    //     let newTask = {id: v1(), title: textTask, isDone: false}
    //     setTasks([...tasks, newTask])
    // }
    // const removeTask = (idTask: string) => {
    //     const filteredArr = tasks.filter(t => t.id != idTask)
    //     setTasks(filteredArr)
    // }
    // const handleChangeIsDone = (idTask: string) => {
    //     setTasks( tasks.map(t => t.id === idTask ? {...t,isDone:!t.isDone} :t) )
    // }

    // const changeFilter = (idTodo:string,filter: FilterType) => {
    //     dispatch(todoListReducerActions.changeFilterAC({idTodo, filter}))
    // }
    const correctTodoTitle=(value:string ,idTodo:string)=>{
        dispatch(todoListReducerActions.correctTodoTitleAC({value, idTodo}))
        // setTodoList(todoList.map(t=>t.id !==idElem? t: {...t, title:value}) )
    }
    // const correctTaskTitle=(value:string ,idElem:string, idTodo:string)=>{
    //
    //     console.log("correctTaskTitle",todoList.map(t=>t.id !==idElem? t: {...t, title:value}));
    //     setTasks(tasks.map(t=>t.id !==idElem? t: {...t, title:value}) )
    // }
    //
    // let resTasks = tasks
    // if (filter === "COMPLETED") {
    //     resTasks = tasks.filter(t => t.isDone)
    // }
    // if (filter === "ACTIVE") {
    //     resTasks = tasks.filter(t => !t.isDone)
    // }

    return (
        <div className="App">
            {todoList.map(t=> <Totolist key={t.idTodo} idTodo={t.idTodo}
                                        title={t.title} filter={t.filter}
                                   correctTodoTitle={correctTodoTitle} />
                )}
            {/*<Totolist id={todoList[0].id} removeTask={removeTask} title={todoList[0].title} tasks={resTasks} filter={filter} handleChangeStatus={handleChangeIsDone}*/}
            {/*          changeFilter={changeFilter} addTask={addTask} correctTodoTitle={correctTodoTitle} correctTaskTitle={correctTaskTitle}/>*/}
        </div>
    );
}

export default App;
