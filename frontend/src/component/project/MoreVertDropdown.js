import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

let currentPath = "";

const MoreVertDropdown = ({ projectNo, projectData }) => {
    let location = useLocation();

    useEffect(() => {
        if(currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
      }, [location]);

    const deleteProject = async () => {
        const resp = await axios.put(`/api/project/delete/${projectNo}`)
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