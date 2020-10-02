import React, { useState, ChangeEvent,KeyboardEvent } from 'react';
import { TextField } from '@material-ui/core';
// import { type } from './App';

type propsType = {
    value:string
    changeValue:(value:string)=>void
}
export const EditableSpan = React.memo((props:propsType)=>{
    let[editMode,setEditMode]= useState<boolean>(false);
    let[title,setTitle]=useState(props.value)

    const activateEditMode=()=>{
        setEditMode(true)
    }
    const deActivateEditMode=()=>{
        setEditMode(false)
        // if(props.changeValue){props.changeValue(title)}
        if(title.trim()){props.changeValue(title)}
    }
    const onChangeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    return  editMode 
    // ?  <input 
    //         value={title} 
    //         onChange={onChangeTitle}
    //         onBlur={deActivateEditMode} 
    //         autoFocus={true}/>
    ? <TextField variant={"outlined"}
            value={title} 
            onChange={onChangeTitle}
            onBlur={deActivateEditMode} 
            autoFocus={true}
            />
    :  <span onDoubleClick={activateEditMode}>{props.value}</span>
    
})