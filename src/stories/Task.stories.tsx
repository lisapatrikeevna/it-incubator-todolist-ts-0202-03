import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
  title: 'Todolist/Task',
  component: Task,
} ;

let changeTaskStatus = action('remove ...')
let changleTaskTitle = action('title changed')
let removeTask = action('delet task')
export const TaskExample = (props:any) => {
  return(
      <div>
      <Task
          task={{id: '1', isDone: false, title: 'title'}}
          removeTask={removeTask}
          changeTaskTitle={changleTaskTitle}
          changeStatus={changeTaskStatus}
      />
        <Task
            task={{id: '2', isDone: true, title: 'title2'}}
            removeTask={removeTask}
            changeTaskTitle={changleTaskTitle}
            changeStatus={changeTaskStatus}
        />
      </div>
  )
};

