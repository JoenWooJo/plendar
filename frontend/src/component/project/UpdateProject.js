import React, { useEffect, useState } from 'react';

import axios from 'axios';
import dayjs from "dayjs";
import { TextField, Typography, Rating, Autocomplete, Checkbox } from "@mui/material";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import { useParams } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UpdateProject = () => {
    const params = useParams();
    const projectNo = params.no;
    const location = useLocation();
    const project = location.state;

    const [title, setTitle] = useState(project["title"]);
    const [description, setDescription] = useState(project["description"]);
    const [priority, setPriority] = useState(project["priority"]);
    const [startDate, setSartDate] = useState(project["startDate"]);
    const [endDate, setEndDate] = useState(project["endDate"]);
    const [reset, setReset] = useState(false);

    const [member, setMember] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [user, setUser] = useState([]);


    const userList = async () => {
        const resp = await axios.get('/api/project/find/user', {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        const list = [];
        (resp.data.data).map((e) => {
            if (e.no != localStorage.getItem('loginUserNo') && e.no != 1) {
                list.push({ no: e.no, name: e.name, email: e.email });
            }
        })
        setUser(list);
    };

    const projectMember = async () => {
        const projMember = await axios.get(`/api/project/find/member/${projectNo}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        setMember(projMember.data.data);
    }

    const updateProject = async (e) => {
        // e.preventDefault();
        const projectData = {
            no: projectNo,
            title: title,
            description: description,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            member: member
        }
        const resp = await axios.post("/api/project/update", projectData, {
            params: {
                userNo: localStorage.getItem("loginUserNo"),
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        
        // resp.data.result == "success" && window.location.replace("/project/myProject");
    };

    const is_checked = (event, index) => {
        // 1. checkbox element를 찾습니다.
        const checkbox = document.getElementById(event.target.id);

        // 2. checked 속성을 체크합니다.
        const is_checked = checkbox.checked;

        let leaderClick = null;
        let managerClick = null;

        if (event.target.id[0] == "l") {
            leaderClick = is_checked;
        } else {
            managerClick = is_checked;
        }


        const data = {
            no: member[index]['no'],
            name: member[index]['name'],
            email: member[index]['email'],
            leader: leaderClick == null ? member[index]["leader"] : leaderClick ? 1 : 0,
            manager: managerClick == null ? member[index]["manager"] : managerClick ? 1 : 0
        }

        member[index] = data;
    };

    const onRemove = (no) => {
        localStorage.getItem('loginUserNo') != no && setMember(member.filter(user => user.no !== no));
    };

    const checkMember = (element) => {
        if (element.no == selectUser["no"]) {
            return true;
        } return false;
    };

    useEffect(() => {
        userList();
        projectMember();
    }, []);

    return (

        <div className="col-xl-12">

            <div className="row">
                <div className="card shadow ml-5 mt-1 col-xl-6">
                    <div className="card-header py-3">
                        <h4 className="m-0 font-weight-bold text-primary" style={{fontFamily: "IBMPlexSansKR-Regular"}}><BorderColorIcon fontSize='large' />&nbsp;Update Project</h4>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <div className='row'>
                                <div className='col-xl-5'>
                                    <Typography component="legend" style={{fontFamily: "IBMPlexSansKR-Regular"}}> 프로젝트 제목</Typography>
                                    <TextField id="standard-basic" variant="standard" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                </div>
                                <div className='col-xl-5'>
                                    <Typography component="legend" style={{fontFamily: "IBMPlexSansKR-Regular"}}> 프로젝트 중요도</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={priority}
                                        onChange={(event, priority) => {
                                            setPriority(priority);
                                        }}
                                    />
                                </div>

                                <div className='row'>
                                    <div className='mt-3 ml-2 col-xl-5'>
                                        <div className="form-group">
                                            <label className="exampleFormControlTextarea3" style={{fontFamily: "IBMPlexSansKR-Regular"}}>내용</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea3" style={{fontFamily: "IBMPlexSansKR-Regular"}}
                                            rows="7" value={description} onChange={(e) => { setDescription(e.target.value) }}>
                                                {description}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className='mt-5 ml-3 col-xl-5'>
                                        <Typography component="legend" style={{fontFamily: "IBMPlexSansKR-Regular", marginBottom: "7px"}}> 시작일 </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>start-date</Typography>}
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
                                            <Typography component="legend" style={{fontFamily: "IBMPlexSansKR-Regular", marginBottom: "7px"}}> 마감일 </Typography>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>end-date</Typography>}
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
                        <h4 className="m-0 font-weight-bold text-primary" style={{fontFamily: "IBMPlexSansKR-Regular"}}><PersonAddIcon fontSize='large' />&nbsp;Member</h4>
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
                                        renderInput={(params) => <TextField {...params} label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>프로젝트 멤버 추가</Typography>} id='text' type='select' />
                                        }
                                    />
                                </div>
                                <div className='mt-2 col-xl-1'>
                                    <button type="submit" className="btn btn-secondary" onClick={() => {
                                        selectUser != null && !member.some(checkMember) && setMember([...member, selectUser]);
                                        setReset(reset => !reset);
                                    }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>add</button>
                                </div>

                                <div className="table-responsive mt-3" style={{ height: "200px", overflow: "auto" }}>
                                    <table className="table table-bordered" id="dataTable" width="100%">
                                        <thead>
                                            <tr className="text-center" >
                                                <th scope="col" style={{fontFamily: "IBMPlexSansKR-Regular"}}>name</th>
                                                <th scope="col" style={{fontFamily: "IBMPlexSansKR-Regular"}}>email</th>
                                                <th scope="col" style={{fontFamily: "IBMPlexSansKR-Regular"}}>leader</th>
                                                <th scope="col" style={{fontFamily: "IBMPlexSansKR-Regular"}}>manager</th>
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
                                                            <td style={{fontFamily: "IBMPlexSansKR-Regular"}}>{m.name}</td>
                                                            <td style={{fontFamily: "IBMPlexSansKR-Regular"}}>{m.email}</td>
                                                            <td><Checkbox id={'leader_checkbox_' + i} checked={m.leader == 1 ? true : false} onClick={(event) => { setReset(reset => !reset), is_checked(event, i) }}
                                                            /></td>
                                                            <td><Checkbox id={'manager_checkbox_' + i} checked={m.manager == 1 ? true : false} onClick={(event) => { setReset(reset => !reset), is_checked(event, i) }}
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
                <Link to={title == '' || description == '' || priority == 0 || startDate == null || endDate == null || member == [] ? `/updateProject/${projectNo}` :
                    "/project/myProject"} state={"update"} style={{ textDecoration: "none" }}>
                    <button type="button" className=" mt-4 mr-2 btn btn-secondary"
                        onClick={(e) => {
                            title == '' || description == '' || priority == 0 || startDate == null || endDate == null || member == [] ? alert("모두 입력해주세요") : updateProject(e)
                        }}>Update</button>
                </Link>

                <Link to="/project/myProject" style={{ textDecoration: "none" }}>
                    <button type="button" className=" mt-4 btn btn-secondary">취소</button>
                </Link>
            </center>
        </div>

    );
};

export default UpdateProject;