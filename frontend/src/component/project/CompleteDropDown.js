import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/font.css";

const CompleteDropDown = ({ projectNo }) => {

    const changeOngoing = async (e) => {
        e.preventDefault();
        await axios.put("/api/project/change/ongoing",[],{
            params: {
                userNo: localStorage.getItem("loginUserNo"),
                projectNo: projectNo
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        })
        location.href = "/project/myproject";
    };
    

    const deleteProject = async () => {
        await axios.delete(`/api/project/delete/${projectNo}`,{
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        });
    };

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show "
                aria-labelledby="alertsDropdown">
                <Link className="dropdown-item d-flex align-items-right" 
                    to="/project/myproject" style={{fontFamily: "IBMPlexSansKR-Regular"}} onClick={(e)=>{changeOngoing(e)}}>프로젝트 다시 진행</Link>
                <Link className="dropdown-item d-flex align-items-right" to='/project/completepage' onClick={()=>{deleteProject()}} style={{fontFamily: "IBMPlexSansKR-Regular"}}>삭제</Link>
            </div>
        </div>
    );
};

export default CompleteDropDown;