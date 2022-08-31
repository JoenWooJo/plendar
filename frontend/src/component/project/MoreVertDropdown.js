import React from 'react';
import { Link } from 'react-router-dom';

const MoreVertDropdown = ({ projectNo, projectData }) => {
    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show "
                                aria-labelledby="alertsDropdown">
                                <Link className="dropdown-item d-flex align-items-right" 
                                    to={`/updateProject/${projectNo}`} state={projectData}>
                                        <div className="status-indicator bg-success"></div>
                                   수정
                                </Link>
                                <a className="dropdown-item d-flex align-items-right" href="#">
                                        <div className="status-indicator"></div>
                                    삭제
                                </a>
                            </div>
        </div>
    );
};

export default MoreVertDropdown;