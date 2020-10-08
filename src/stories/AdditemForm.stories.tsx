import React from 'react';
import {action} from "@storybook/addon-actions";
import {AddIemForm} from "../AddItemForm";

export default {
  title: 'Todolist/AddItemForm',
  component: AddIemForm,
} ;

export const AddItemFormExample = (props:any) => {
  return(
      <AddIemForm addItem={action('btn inside form click')}/>
  )
};

