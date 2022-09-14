import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import axios from 'axios';
import Ongoing from './Ongoing';
import ComputerIcon from '@mui/icons-material/Computer';

let currentPath = "";

const Myproject = () => {
    const location = useLocation();
    const state = location.state;
    const [projectList, setProjectList] = useState([]);
    const [projectMember, setProjectMember] = useState([]);
    const userNo = localStorage.getItem("loginUserNo");

    const fetchAndProjectList = async () => {
        await axios.get(`/api/project/find/project/${userNo}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            })
            .then((resp) => {
                const list = resp.data.data;
                setProjectList(list);
            })
    };

    const findProjectMemberByNo = async () => {
        await axios.get(`/api/project/findProjectMembeByNo`, {
            params: {userNo: localStorage.getItem("loginUserNo")},
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            })
            .then((resp) => {
                const list = resp.data.data
                setProjectMember(list);
            })
    };

    console.log("list", projectMember);

    useEffect(() => {
        if(currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
      }, [location]);

    useEffect(() => {
        fetchAndProjectList();
        findProjectMemberByNo();
        const f = () => {
            let child = document.getElementById("proj-new-img");
            child != null && child.parentNode.removeChild(child);
        }
        document.addEventListener("click", f);

        return () => {
            document.removeEventListener("click", f)
        }
    }, []);


    return (
            <div className="col-xl-11 ml-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary"><ComputerIcon fontSize="large" /> &nbsp;My Projects</h4>
                </div>
                <div className="card-body" style={{ height: "680px", overflow: "auto" }} >
                    <div className="d-sm-flex align-items-center justify-content-between col-xl-12 mb-4 ">
                        <div className="btn-group btn-group-toggle" data-toggle="button">
                            <label className="btn btn-secondary active">
                                <Link to="/project/myproject" className='text-white ' style={{ textDecoration: "none" }}> 진행중</Link>
                            </label>
                            <label className="btn btn-secondary">
                                <Link to="/project/completepage " className='text-white' style={{ textDecoration: "none" }}> 완료</Link>
                            </label>
                        </div>

                        <NavLink className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" to={'/project/createProject'}>
                            <i className="fas fa-download fa-sm text-white-50"></i>
                            create project
                        </NavLink>
                    </div>

                    <div className="row mb-4" style={{ overflow: "auto" }}>
                        {
                            projectList.map((m, i) => {
                                return (
                                    <Ongoing
                                        key={i}
                                        no={m.no}
                                        title={m.title}
                                        description={m.description}
                                        endDate={m.endDate}
                                        startDate={m.startDate}
                                        finished={m.finished}
                                        priority={m.priority}
                                        state={state}
                                        leader = {!!projectMember[i]&&projectMember[i].leader}
                                    />
                                );
                            })}
                    </div>

                </div>
            </div>
    );
};

export default Myproject;