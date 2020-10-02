import {v1} from "uuid";
import {
    AddTaskAC, ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemuveTaskAC,
    TaskReducer,
    taskStateType
} from "./TasksRreducer";

let startState: taskStateType
beforeEach(()=>{
    startState= {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})
test('correct task should be deleted from correct array', () => {

const action = RemuveTaskAC("2", "todolistId2");

const endState = TaskReducer(startState, action)

expect(endState["todolistId1"].length).toBe(3);
expect(endState["todolistId2"].length).toBe(2);
expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});



test('correct task should be added to correct array', () => {


    const action = AddTaskAC("juce", "todolistId2");

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})


test('status of specified task should be changed', () => {


    const action = ChangeTaskStatusAC("2", false, "todolistId2");

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});


test('title of specified task should be changed', () => {


    const action = ChangeTaskTitleAC("2", "fish", "todolistId2");

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][1].title).toBe( "JS");
    expect(endState["todolistId2"][1].title).toBe("voter");
});
