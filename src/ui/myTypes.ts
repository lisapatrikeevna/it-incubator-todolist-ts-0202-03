export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type ArrTasksType={
    [idTodo:string]:Array<TaskType>
}
export type FilterType = "ALL" | "ACTIVE" | "COMPLETED"
export type TodosType ={
    idTodo: string
    title: string
    filter: FilterType
}
