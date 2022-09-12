import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';


const MoreVertDropdown = ({ projectNo, projectData }) => {
    

    const deleteProject = async () => {
        // console.log(">>",projectNo);
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
                    to={`/updateProject/${projectNo}`} state={projectData}>수정</Link>
                <Link className="dropdown-item d-flex align-items-right" to='/project/myproject' onClick={()=>{deleteProject()}}>삭제</Link>
            </div>
        </div>
    );
};

export default MoreVertDropdown;