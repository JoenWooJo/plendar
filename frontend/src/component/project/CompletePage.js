import React, { useEffect, useState } from 'react';
import Complete from './Complete';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import axios from 'axios';

let currentPath = "";

const CompletePage = () => {
    const location = useLocation();
    const state = location.state;

    const [completeProject, setCompleteProject] = useState([]);
    const [projectMember, setProjectMember] = useState([]);

    const findProject = async () => {
        const resp = await axios.get("/api/project/find/completeProject", {
            params: {
                userNo: localStorage.getItem("loginUserNo"),
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });

        setCompleteProject(resp.data.data);
        console.log(resp.data.data);
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

    useEffect(()=> {
        findProject();
        findProjectMemberByNo();
    }, []);

    

    useEffect(() => {
        if(currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
      }, [location]);


    return (
        <div className="col-xl-11 ml-4">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-gray"> <LibraryAddCheckIcon fontSize='large' />&nbsp;Complete projects</h4>
                </div>
                <div className="card-body">
                    <div className="d-sm-flex align-items-center justify-content-between col-xl-12 mb-4">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-secondary ">
                                <Link to="/project/myproject" className='text-white' style={{ textDecoration: "none", fontFamily: "IBMPlexSansKR-Regular" }}> 진행중</Link>
                            </label>
                            <label className="btn btn-secondary active">
                                <Link to="/project/completepage" checked className='text-white' style={{ textDecoration: "none", fontFamily: "IBMPlexSansKR-Regular" }}> 완료</Link>
                            </label>
                        </div>
                        <NavLink className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" to={'/project/createProject'}>
                            <i className="fas fa-download fa-sm text-white-50"></i>
                            create project
                        </NavLink>
                    </div>

                    <div className="row">
                        {
                            completeProject.length != 0 && completeProject.map((e,i)=> (
                                <Complete 
                                    key={i}
                                    state={state}
                                    no={e.no}
                                    title = {e.title}
                                    priority={e.priority}
                                    startDate={e.startDate}
                                    endDate={e.endDate}
                                    leader = {!!projectMember[i] && projectMember[i].leader}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletePage;