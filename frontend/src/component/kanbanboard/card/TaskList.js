import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import {postJson} from '../../../api/Axios';
import { Typography } from '@mui/material';
import "../../../assets/css/font.css";

const TaskList = ({content, taskNo}) => {
    const [taskChange, setTaskChange] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [taskContent, setTaskContent] = useState(content);

     //Task 수정하기 
     useEffect(() => {
        postJson(`/kanban/task/update`, JSON.stringify({ content: taskContent, no: taskNo }));
    }, [taskContent]);


    const onChangeTask= (event) => {
        setTaskContent(event.target.value);
    }

    const onClickTask = () => {
        setClickChk(clickChk + 1);
        setTaskChange(true)
        if (clickChk > 2) {
            onChangeTask
            setTaskChange(false);
            setClickChk(0);
        }
    }

    const keyEnter = (e) => {
        if (e.key == "Enter") {
            onChangeTask
            setTaskChange(false);
            setClickChk(0);
        }
    }

    return (
        <>
         {/* task내용 */}
         <div className='col-xl-9' onClick={onClickTask}>
         { taskChange
             ?
             <TextField
             id="outlined-multiline-flexible"
             multiline
             label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>task 수정</Typography>}
             maxRows={4}
             value={taskContent}
             onChange={onChangeTask}
             onKeyPress={keyEnter}
             sx={{ml: 1 }}
             size="small"
             />
             :
             <div style={{fontFamily: "IBMPlexSansKR-Regular", marginTop: "7px"}}>{taskContent}</div>
             }
             </div>
        </>
    );
};

export default TaskList;