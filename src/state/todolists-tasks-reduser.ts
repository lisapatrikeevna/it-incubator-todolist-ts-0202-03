import {taskStateType, todoListsType} from "../App";
import {AddTodoListAC, TodoListReducer} from "./TodoListRreducer";
import {TaskReducer} from "./TasksRreducer";


test('ids should be equals', () => {
    const startTasksState: taskStateType = {};
    const startTodolistsState: Array<todoListsType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


