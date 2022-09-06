import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get, } from '../../../../api/Axios';
import dayjs from "dayjs";

import { Form } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';


const UpdateCard = ({ show, setShow, projectNo, deckNo, cardNo }) => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [selectUser, setSelectUser] = useState([]);
    const [cardUserList, setCardUserList] = useState([]);
    const [reset, setReset] = useState(false);
    const [member, setMember] = useState([]);

    //카드 유저 리스트 가져오기
    const getCardUser = async () => {
        const list = await get(`/kanban/card/find/carduser/${projectNo}`);
        setCardUserList((prevcCardUserlist) => prevcCardUserlist.concat(list));
    }

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    // closeIcon 클릭
    const onRemove = (no) => {
        setMember(member.filter(user=>user.no!==no));
    }

    // 카드 업데이트
    const updateCard = (e) => {
        let body = {
            no: cardNo,
            deckNo: deckNo,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            member: member
        }

        axios.post('/api/kanban/card/updateCard', body)
            .then((resp) => {
                if (resp.data.result == "fail") {
                    alert(resp.data.message);
                    window.location.replace("/login");
                }
                resp.data.result === "success" && alert("수정이 완료되었습니다.")
                setShow(!show);
            })
    }

    // 카드의 현재 유저 불러오기
    useEffect(() => {
        const findCurrentCardmember = async () => {
            await axios.get(`/api/kanban/card/findCurrentCardmember/${cardNo}`)
            .then((resp) => {
                const list = resp.data.data;
                setMember(list);
            })
        }
        findCurrentCardmember();
    }, []);

    // 현재 카드 정보 가져오기
    useEffect(() => {
        const findCardInfo = async () => {
            await axios.get(`/api/kanban/card/findCardInfo/${cardNo}`)
            .then((resp) => {
                const info = resp.data.data;
                setTitle(info.title);
                setDescription(info.description);
                setStartDate(info.startDate);
                setEndDate(info.endDate);
            })
        }
        findCardInfo();
    }, []);


    useEffect(() => {
        getCardUser();
    }, [])

    const checkMember = (element) => {
        if(element.no == selectUser["no"]) {
            return true;
        } return false;
    };


    const handleClose = () => {
        setShow(false);
        setPage("card");
    }


    return (
        <>
            <Modal.Body>
                <Form>
                    <div className='row'>
                        <div className='col-xl-6'>
                            {/* 카드 제목 */}
                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                <Form.Label>카드 이름</Form.Label>
                                <Form.Control
                                    type="title"
                                    value={title || ''}
                                    autoFocus
                                    onChange={changeTitle}
                                />
                            </Form.Group>

                            {/* 카드 내용 */}
                            <Form.Group
                                className="mb-3 "
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>
                                    설명
                                </Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            </Form.Group>

                            {/* 시작일 */}
                            <div className='ml-3 mb-3'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="시작일"
                                        value={startDate}
                                        inputFormat={"yyyy-MM-dd"}
                                        mask={"____-__-__"}
                                        onChange={(startDate) => {
                                            const dateFormat = dayjs(startDate).format("YYYY-MM-DD");
                                            setStartDate(dateFormat);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                            {/* 마감일 */}
                            <div className='ml-3'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="마감일"
                                        value={endDate}
                                        inputFormat={"yyyy-MM-dd"}
                                        mask={"____-__-__"}
                                        onChange={(endDate) => {
                                            const dateFormat = dayjs(endDate).format("YYYY-MM-DD");
                                            setEndDate(dateFormat);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                        {/* 유저에게 카드권한 주기 */}
                        <div className='col-xl-6 mt-4'>
                            <Autocomplete
                                key={reset}
                                id="controllable-states-demo"
                                options={cardUserList}
                                onChange={(e, newValue) => {
                                    newValue != null && setSelectUser(newValue)
                                }}
                                getOptionLabel={(cardUserList) => cardUserList.email + " " + cardUserList.name}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="참가자" id='text' type='select' />}
                            />
                            <div className='mt-2 col-xl-1'>
                                <button type="submit" className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    selectUser != null && !member.some(checkMember) && setMember([...member, selectUser]);
                                    setReset(reset => !reset);
                                }}>add</button>
                            </div>
                            <div className="table-responsive mt-3" style={{ height: "200px", overflow: "auto" }}>
                             <table className="table table-bordered" id="dataTable" width="100%"> 
                                <thead>
                                    <tr>
                                        <th scope="col">name</th>
                                        <th scope="col">email</th>
                                        <th scope="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        member.map((m, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {m.name}
                                                    </td>
                                                    <td>
                                                        {m.email}
                                                    </td>
                                                    <td onClick={()=>onRemove(m.no)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className=" mt-1 bi bi-x" viewBox="0 0 16 16">
                                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                    </svg>
                                                                </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(!show)}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateCard}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
};

export default UpdateCard;