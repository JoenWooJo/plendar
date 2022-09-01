import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import update from 'react-addons-update';
import AddTask from '../task/AddTask';
import CardModal from './cardmodal/CardModal';
import { get } from '../../../api/Axios';
import axios from 'axios';
import TeamCalendar from '../../calendar/TeamCalendar';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Card = ({ card , projectNo, deckNo, setRefresh, refresh}) => {
    
    const { description, title, no } = card;
    const [showDetail, setShowDetail] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [check, setCheck] = useState([]);

    useEffect(() => {
        taskList.length === 0 && t();
        const arr = [];
        taskList.map((m) => {
            return m.finished === "Y" ? arr.push(true) : arr.push(false);
        })
        setCheck(arr);
    }, [taskList.length, check.length, refresh])
    
    //테스크 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/task/find/${no}`);
        setTaskList(list);
    }

    const onChangeCard = (finished) => {
        setShowDetail(showDetail => !showDetail)
    }

    const changeTaskStatus = async (e) => {

        let no = e.target.value;
        let finish = e.target.checked;

        let body = {
            no: no,
            finished: finish ? "Y" : "N"
        }
        await axios.post("/api/kanban/task/clickTask", body)
            .then((resp) => {
                if (resp.data.result == "fail") {
                    alert(resp.data.message);
                    window.location.replace("/login");
                }
                
                const newTaskList = update(taskList, {
                    [taskList.findIndex(task => task.no == no)]: {
                        finished: {
                            $set: finish ? "Y" : "N"
                        }
                    }
                });
        
                setTaskList(newTaskList)
            })
        
        
    }
    return (
        <div>
            <div className="card bg-light text-black shadow mb-2">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-xl-10 mt-2">
                            {title}<CardModal title={title} projectNo={projectNo} deckNo={deckNo} cardNo={no}/>
                        </div>

                        <AddTask 
                            cardNo = {no} 
                            setRefresh={setRefresh}
                        />
                    </div>
                    <div className='row'>
                        <div className="col-xl-9 mt-3 text-black-50 small">{description}</div>
                        <div className='col-xl-2 mt-2' type="button" onClick={onChangeCard}>
                            {showDetail ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </div>
                    </div>
                    {showDetail
                        ?
                        taskList.map((m, i) =>
                        (<div key={i}>
                            <hr />
                            <Checkbox
                                value={m.no}
                                onChange={(e) => {
                                    changeTaskStatus(e);
                                }}
                                checked={m.finished === "Y" ? true: false}  
                            />
                            {m.content} <br />
                        </div>
                        )
                        )
                        :
                        null
                    }
                </div>
            </div>
        </div>        
    );
};

export default Card;