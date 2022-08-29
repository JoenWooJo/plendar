import React, { useState, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { get, } from '../../../api/Axios';
import axios from 'axios';
import dayjs from "dayjs";


const CreateCard = ({ show, setShow, projectNo, no, cardNo, setRefresh }) => {
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [selectUser, setSelectUser] = useState();
    const [cardUserList, setCardUserList] = useState([]);
    const [reset, setReset] = useState(false);
    const [member, setMember] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    //카드 유저 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/card/find/carduser/${projectNo}`);
        setCardUserList((prevcCardUserlist) => prevcCardUserlist.concat(list));
        }

    //카드 생성하기
    const CreateCard = () => {

        const arr = {
            cardNo:cardNo,
            deckNo:no, //덱 넘버
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            member: member
        }

        axios.post('/api/kanban/card/create', arr).then((resp) => {
            console.log(">>>card create ",resp);
            setShow(!show)
            setRefresh(refresh => ! refresh);
        }).catch((err) => {
            console.error(err, no)
            alert("카드 정보를 모두 입력해 주세요");
        });
    };


    useEffect(() => {
        t();
    }, [])

    return (
        <div className='col-xl-1'>
            <Modal size='lg' show={show} onHide={() => setShow(!show)}>
                <Modal.Header >
                    <Modal.Title>카드 추가하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='row'>
                            <div className='col-xl-6'>
                                {/* 카드 제목 */}
                                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                    <Form.Label>카드 이름</Form.Label>
                                    <Form.Control
                                        type="title"
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        autoFocus
                                    />
                                </Form.Group>

                                {/* 카드 내용 */}
                                <Form.Group
                                    className="mb-3 "
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>설명</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        onChange={(e) => { setDescription(e.target.value) }} />
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
                                    renderInput={(params) => <TextField {...params} label="카드 권한" id='text' type='select' />}
                                />
                                <div className='mt-2 col-xl-1'>
                                    <button type="submit" className="btn btn-secondary" onClick={(e) => {
                                        e.preventDefault();
                                        selectUser != null && !member.includes(selectUser) && setMember([...member, selectUser]);
                                        setReset(reset => !reset);
                                    }}>add</button>
                                </div>
                                <table className=" mt-3 table table-striped">
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
                                                        <td>
                                                            <CloseIcon />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(!show)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={CreateCard}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CreateCard;