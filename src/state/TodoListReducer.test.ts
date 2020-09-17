import {filterTaskType, todoListsType} from "../App";
import {
    AddTodoListAC,
    ChangeTodoListAC, ChangeTodoListFilterAC,
    RemuveTodoListAC,
    TodoListReducer
} from "./TodoListRreducer";
import {v1} from "uuid";
import {TaskReducer} from "./TasksRreducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startStateTodolist: Array<todoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = RemuveTodoListAC(todolistId1);
    const endStateTodolist = TodoListReducer(startStateTodolist, action);
    const endStateTasks = TaskReducer(startStateTasks, action);
    const taskId = Object.keys(endStateTasks)

    expect(endStateTodolist.length).toBe(1);
    expect(endStateTodolist[0].id).toBe(todolistId2);
    expect(taskId[0].length).toBe(1);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startStateTodolist: Array<todoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = AddTodoListAC(newTodolistTitle)
    const endStateTodolist = TodoListReducer(startStateTodolist, action)
    const endStateTasks = TaskReducer(startStateTasks, action)

    const newTodolistId = endStateTodolist[2].id
    const taskId = Object.keys(endStateTasks)
    expect(endStateTodolist.length).toBe(3);
    expect(endStateTodolist[2].title).toBe(newTodolistTitle);
    expect(endStateTodolist[2].filter).toBe("all");
    expect(newTodolistId).toBeDefined();
    expect(newTodolistId).toBe(taskId[2]);

});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = TodoListReducer(startState, ChangeTodoListAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: filterTaskType = "completed";

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //
    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistId2,
    //     filter: newFilter
    // };

    const endState = TodoListReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});





