import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddTask from '../task/AddTask';
import CardModal from './cardmodal/CardModal';
import {get} from '../../../api/Axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Card = ({ card }) => {

    const { description, title, no } = card;
    const [showDetail, setShowDetail] = useState(false);
    const [taskList, setTaskList] = useState([]);

    //테스크 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/task/find/${no}`);
        setTaskList((prevcTasklist) => prevcTasklist.concat(list));
        console.log(list);
    }

    useEffect(() => {
     t();
    },[])

    const onChangeCard = () => {
        setShowDetail(showDetail => !showDetail)
    }

    return (
        <div>
            <div className="card bg-light text-black shadow mb-2">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-xl-10 mt-2">
                            <CardModal
                                title={title} />
                        </div>
                        <AddTask 
                            cardNo = {no}
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
                            <Checkbox /> {m.content} <br />
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