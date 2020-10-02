import React, { useState, ChangeEvent,KeyboardEvent } from 'react';
import {TextField, Icon} from '@material-ui/core';
import {Delete, Height} from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';


type propsType={
    addItem: (title: string) => void

}
export const AddIemForm = React.memo((props:propsType)=>{
    let[title, setTitle]=useState<string>('');
    let[error,setError]=useState<string | null>(null);
    const newTask= (e:ChangeEvent<HTMLInputElement>)=>{
        setError(null);
        setTitle(e.currentTarget.value);
    }
    const ifOnKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){ setError(null); }
        if(e.key==='Enter'){addNewTitle()}}
    const addNewTitle=()=>{
        if(title.trim()){
            props.addItem(title.trim());
            setTitle('');
        }else{
            setError('Title is required!')
        }
    }
    return(
        <div>
            {/* <input type="text" 
                value={title} 
                onChange={newTask} 
                onKeyPress={ifOnKeyPress}
                className={error ? 'error' : ''}/> */}
                <TextField 
                variant={"outlined"}
                value={title}
                onChange={newTask} 
                onKeyPress={ifOnKeyPress}
                error={!!error}
                helperText={error}
                label={"Title"}/>
            <Button type='button' onClick={addNewTitle}
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={< NoteAddIcon />}>add</Button>
            {/* {error && <div className={'error-message'}>{error} */}
            {/* </div>} */}
        </div>
    )
})
// export default AddIemForm;