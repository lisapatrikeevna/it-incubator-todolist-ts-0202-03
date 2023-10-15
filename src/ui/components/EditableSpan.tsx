import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from 'react';
import {Box, Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import cl from "../Todo.module.css"


type PropsType={
    title:string
    setCorrectedValue:(value:string ,idElem:string)=>void
    idElem:string
}
const EditableSpan = (props: PropsType) => {
    const [wontCorrect, setWontCorrect] = useState(false)
    const [inputValue, setInputValue] = useState(props.title)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const seveTitle = () => {
        console.log("inputValue.length >0",inputValue.length >0)
        // if (inputValue.length >0) {
        //     console.log("inputValue.length >0",inputValue.length >0)
        //     setBtnDisabled(false)
        // }
        props.setCorrectedValue(inputValue.trim(),props.idElem)
        // setInputValue('')
        setWontCorrect(!wontCorrect)
    }
    const addWithEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.charCode === 12) {
            seveTitle()
        }
    }
    const onDoubleClickHandler = () => {
        setWontCorrect(!wontCorrect)
    }

    // if (inputValue.length <1) {
    //     console.log("inputValue.length >0",inputValue.length >0)
    //     setBtnDisabled(false)
    // }
    useEffect(()=>{
        console.log("inputValue.length <1",inputValue.length )
        inputValue.length<1? setBtnDisabled(true):setBtnDisabled(false)
    },[inputValue])
    return (
        <Box className={cl.editableSpanWrap}>
            {!wontCorrect ?
                <h3 onDoubleClick={onDoubleClickHandler} className={cl.borderBottomCl}>{props.title}</h3> :
                <Box>
                    <TextField label="title for new task" variant="outlined" autoFocus
                               onKeyPress={addWithEnter} onBlur={seveTitle}
                               onChange={onChangeText} value={inputValue}/>
                    <Button startIcon={<SendIcon/>} variant="contained"
                            onClick={seveTitle} disabled={btnDisabled}>save</Button>
                </Box>
            }
        </Box>
    );
};

export default EditableSpan;