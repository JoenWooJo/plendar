import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/font.css";

const MoreVertDropdown = ({ projectNo, projectData }) => {
    

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
                    to={`/updateProject/${projectNo}`} state={projectData} style={{fontFamily: "IBMPlexSansKR-Regular"}}>수정</Link>
                <Link className="dropdown-item d-flex align-items-right" to='/project/myproject' onClick={()=>{deleteProject()}} style={{fontFamily: "IBMPlexSansKR-Regular"}}>삭제</Link>
            </div>
        </div>
    );
};

export default MoreVertDropdown;