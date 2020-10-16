
import axios from 'axios'


const smb=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '40979d82-3c32-4398-abbe-81041d6b3ea6'
    }
})
type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export const todolistAPI = {

    getTodolists(){
        return smb.get<Array<TodolistType>>('todo-lists/')
    },
    createTodolist(title:string){
      return  smb.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title:title})
    },
    deleteTodolist(todolistId:string){
        return smb.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return smb.put<ResponseType<{ item: TodolistType }>>(`todo-lists/ ${todolistId}`, {title: title})
    }
}
