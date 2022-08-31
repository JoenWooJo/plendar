import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import dayjs from "dayjs";

import SiteLayout from '../../layout/SiteLayout';
import { TextField, Typography, Rating, Autocomplete, Checkbox } from "@mui/material";
import { Link } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(0);
    const [startDate, setSartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reset, setReset] = useState(false);

    const [member, setMember] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('/api/project/find/user')
            .then((resp) => {
                const userList = resp.data.data;
                const list = [];
                userList.map((e) => {
                    if (e.no != localStorage.getItem('loginUserNo')) {
                        list.push({ no: e.no, name: e.name, email: e.email });
                    }
                })
                setUser(list);
            })
    }, []);

    useEffect(() => {
        console.log("member: ", member);
    }, [member, is_checked]);

    const createProject = () => {
        axios.post('/api/project/create', {
            title: title,
            description: description,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            member: member
        }).then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.error(err)
        });
    };

    const is_checked = (index) => {
        // 1. checkbox element를 찾습니다.
        const checkbox = document.getElementById('permission_checkbox_' + index);
        // 2. checked 속성을 체크합니다.
        const is_checked = checkbox.checked;

        // 3. 결과를 출력합니다.
        //console.log(is_checked);

        const data = {
            no: member[index]['no'],
            name: member[index]['name'],
            email: member[index]['email'],
            permission: is_checked
        }

        member[index] = data;
    }

    const onRemove = (no) => {
        localStorage.getItem('loginUserNo') != no && setMember(member.filter(user => user.no !== no));
    }

    return (

        <div>
            <SiteLayout>
                <div className="col-xl-12">

                    <div className="row">
                        <div className="card shadow ml-5 mt-1 col-xl-6">
                            <div className="card-header py-3">
                                <h4 className="m-0 font-weight-bold text-primary">Craete Project</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <div className='row'>
                                        <div className='col-xl-5'>
                                            <Typography component="legend"> 프로젝트 제목</Typography>
                                            <TextField id="standard-basic" variant="standard" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                        </div>

                                        <div className='col-xl-5'>
                                            <Typography component="legend"> 프로젝트 중요도</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                value={priority}
                                                onChange={(event, priority) => {
                                                    setPriority(priority);
                                                    //console.log(priority);
                                                }}
                                            />
                                        </div>

                                        <div className='row'>
                                            <div className='mt-3 ml-2 col-xl-5'>
                                                <div className="form-group">
                                                    <label className="exampleFormControlTextarea3">내용</label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea3" rows="7" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                                </div>
                                            </div>

                                            <div className='mt-5 ml-3 col-xl-5'>
                                                <Typography component="legend"> 시작일 </Typography>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="start-date"
                                                        value={startDate}
                                                        inputFormat={"yyyy-MM-dd"}
                                                        mask={"____-__-__"}
                                                        onChange={(startDate) => {
                                                            const dateFormat = dayjs(startDate).format("YYYY-MM-DD");
                                                            setSartDate(dateFormat);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <div className='mt-2'>
                                                    <Typography component="legend"> 마감일 </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            label="end-date"
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow ml-3 mt-1 col-xl-4">
                        <div className="card-header py-3">
                                <h4 className="m-0 font-weight-bold text-primary">Member</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-bar">
                                    <div className='row'>
                                        <div className='col-xl-10'>
                                            <Autocomplete
                                                key={reset}
                                                id="free-solo-demo"
                                                freeSolo
                                                options={user}
                                                onChange={(e, newValue) => {
                                                    newValue != null && setSelectUser(newValue)
                                                }}
                                                getOptionLabel={(user) => user.email + " " + user.name}
                                                renderInput={(params) => <TextField {...params} label="프로젝트 멤버 추가" id='text' type='select' />
                                                }
                                            />
                                        </div>
                                        <div className='mt-2 col-xl-1'>
                                            <button type="submit" className="btn btn-secondary" onClick={() => {
                                                selectUser != null && !member.includes(selectUser) && setMember([...member, selectUser]);
                                                setReset(reset => !reset);
                                            }}>add</button>
                                        </div>
                                        <div className="table-responsive mt-3" style={{ height: "200px", overflow: "auto" }}>
                                             <table className="table table-bordered" id="dataTable" width="100%">
                                                <thead>
                                                    <tr className="text-center" >
                                                        <th>name</th>
                                                        <th>email</th>
                                                        <th>manager</th>
                                                        <th>
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
                                                                    <td>{m.name}</td>
                                                                    <td>{m.email}</td>
                                                                    <td><Checkbox id={'permission_checkbox_' + i} onClick={() => { is_checked(i) }}
                                                                    /></td>
                                                                    <td onClick={() => onRemove(m.no)}>
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
                            </div>
                        </div>
                    </div>

                    <center>

                        <Link to={title == '' || description == '' || priority == 0 || startDate == null || endDate == null || member == [] ? "/project/createProject" :
                            "/project/myProject"} style={{ textDecoration: "none" }}>
                            <button type="button" className=" mt-4 mr-2 btn btn-secondary"
                                onClick={(e) => {
                                    title == '' || description == '' || priority == 0 || startDate == null || endDate == null || member == [] ? alert("모두 입력해주세요") : createProject()
                                }}>Create</button>
                        </Link>

                        <Link to="/project/myProject" style={{ textDecoration: "none" }}>
                            <button type="button" className=" mt-4 btn btn-secondary">취소</button>
                        </Link>
                    </center>
                </div>
            </SiteLayout>
        </div>
    );
};

export default CreateProject;