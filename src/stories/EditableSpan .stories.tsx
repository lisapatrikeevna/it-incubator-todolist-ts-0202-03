import React from 'react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
  title: 'Todolist/EditableSpan ',
  component: EditableSpan ,
} ;

export const EditableSpanExample = (props:any) => {
  return(
      <EditableSpan  value={'start'} changeValue={action('EditableSpan changet')}/>
  )
};

