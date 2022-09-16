import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import update from 'react-addons-update';
import AddTask from '../task/AddTask';
import CardModal from './cardmodal/CardModal';
import { get, remove } from '../../../api/Axios';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import TaskList from './TaskList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Draggable } from "react-beautiful-dnd";
import './card.css';

const Card = ({ projectNo, deckNo, refresh, setRefresh, manager, index, sequence, cards, deck }) => {
    let location = useLocation();
    const state = location.state;
    const cardView = state != null ? state["cardNo"] : "";
    const noticeType = state != null ? state["type"] : "";
    const noticeNo = state != null && state["noticeNo"] ? state["noticeNo"] : "";
    const [showDetail, setShowDetail] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [check, setCheck] = useState([]);
    const [noSum, setNoSum] = useState(0);
    const [taskSum, setTaskSum] = useState(0);
    const [member, setMember] = useState([]);

    //카드 테스크 개수
    const cardTask = async () => {
        const list = await get(`/kanban/card/findtaskcount/${cards.no}`);
        setTaskSum(list);
    }

    //테스크 완료 개수
    const cardN = async () => {
        const list = await get(`/kanban/card/findncount/${cards.no}`);
        setNoSum(list);
    }

    useEffect(() => {
        cardTask();
        cardN();
    }, [taskList]);

    useEffect(() => {
        taskList.length === 0 && t();
        const arr = [];
        taskList.map((m) => {
            return m.finished === "Y" ? arr.push(true) : arr.push(false);
        })
        setCheck(arr);
    }, [taskList.length, check.length])

    useEffect(() => {
        t();
    }, [refresh])

    //테스크 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/task/find/${cards.no}`);
        setTaskList(list);
    }

    //테스크 삭제하기
    const removeTask = async (taskNo) => {
        await remove(`/kanban/task/deleteTask/${taskNo}`);
        t();
    }

    //테스크 열고 닫기
    const onChangeCard = (finished) => {
        setShowDetail(showDetail => !showDetail)
    }

    //테스크 수정
    const changeTaskStatus = async (e) => {

        let no = e.target.value;
        let finish = e.target.checked;

        let body = {
            no: no,
            finished: finish ? "Y" : "N"
        }
        await axios.post("/api/kanban/task/clickTask", body, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        })
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

    //카드 삭제하기
    const removeCard = async () => {
        await remove(`/kanban/card/deleteCard/${projectNo}/${cards.no}`);
        setRefresh(refresh => !refresh);
    }

    // 카드의 현재 유저 불러오기
    useEffect(() => {
        const findCurrentCardmember = async () => {
            await axios.get(`/api/kanban/card/findCurrentCardmember/${cards.no}`, {
                headers: {
                    Authorization: window.localStorage.getItem("Authorization"),
                },
            })
                .then((resp) => {
                    const list = resp.data.data;
                    setMember(list);
                })
        }
        findCurrentCardmember();
    }, []);


    const cuList = member.filter((m) => {
        return (
            m.no == localStorage.getItem('loginUserNo')
        );
    })

    return (
        <Draggable
        draggableId={`cards:${cards.no}`}
        index={index}>
        {(dragProvided) => ( <div style={{ position: "relative" }}
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}>
            <div className="card bg-light text-black shadow mb-2" >

                <div className="card-body" id={noSum == 0 && taskSum != 0 ? "card-border" : ""}>
                    {
                        cardView == cards.no && noticeType == "card" ? <span><img id="new-img" className="mb-3 ml-1" src="/assets/images/new.png" alt="" style={{ position: "absolute", width: "35px", top: "-12px", left: "-3px" }} /></span> :
                            cardView == cards.no && noticeType == "comment" ? <span><img id={`new-img-${noticeNo}`} className='mb-3 ml-1' src='/assets/images/comment.png' alt='' style={{ position: "absolute", width: "30px", paddingTop: "5px", top: "-12px", left: "-3px" }} /></span> : ""
                    }
                    <div id={`card-${cards.no}`} >
                        <div className='row'>
                            <div className="col-xl-8 mt-2">
                                <b>{cards.title}</b>
                            </div>
                            {/* 드롭다운 */}
                            <div className='col-xl-1 mr-1'>
                                <DropdownButton id="dropdown-basic-button" title="더보기" size="sm" variant="light">
                                    {(cuList.length != 0 || manager.length != 0) && <AddTask cardNo={cards.no} setRefresh={setRefresh} />}
                                    <CardModal title={cards.title} projectNo={projectNo} deckNo={deckNo} cardNo={cards.no} setRefresh={setRefresh} member={member} setMember={setMember} manager={manager} />
                                    {(cuList.length != 0 || manager.length != 0) && <Dropdown.Item onClick={() => removeCard()} >삭제하기</Dropdown.Item>}
                                </DropdownButton>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-xl-9 mt-3 text-black-50 small">{cards.description}</div>
                            <div className='col-xl-2 mt-2' type="button" onClick={onChangeCard}>
                                {showDetail ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </div>
                        </div>
                        {showDetail
                            ?
                            taskList.map((m, i) =>
                            (
                                <div key={i}>
                                    <hr />
                                    {/* 체크박스 */}
                                    <div className='row'>
                                        <Checkbox
                                            className='col-xl-1'
                                            value={m.no}
                                            onChange={(e) => {
                                                (cuList.length != 0 || manager.length != 0) && changeTaskStatus(e);
                                            }}
                                            checked={m.finished === "Y" ? true : false}
                                        />

                                        {/* task내용 */}
                                        <TaskList
                                            content={m.content}
                                            taskNo={m.no} />

                                        {/* 삭제버튼 */}
                                        <div className='col-xl-1'>
                                            <ClearIcon onClick={() => removeTask(m.no)} />
                                        </div>
                                    </div>
                                </div>

                            )
                            )
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>)}
   </Draggable>);
};

export default Card;