import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Complete = () => {

    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        axios.get('/api/project/find/completeProject', {
            params: {userNo: localStorage.getItem("loginUserNo")},
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            })
            .then((resp) => {
                const list = resp.data.data;
                setProjectList(list);
            })
    }, [projectList]);

    return (
        <>
            {projectList.map((m, i) => {

                return (
                    <div className="col-xl-3  mb-4" key={m.no}>
                        <div className="card border-left-secondary shadow h-100 py-2">
                            <div className="card-body" >
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-gray text-uppercase mb-1"> 완료</div>
                                            <div className=" col-xl-2 nav-link" href="#" role="button" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" style={{ float: 'right' }} >
                                            
                                                <MoreVertIcon />
                                               
                                        </div>
                                        <Link to={`/kanbanboard/${m.no}`} className="h5 mb-0 font-weight-bold text-gray-800" >{m.title}</Link>
                                        <div className='mt-3'>
                                            <Rating
                                                value={m.priority}
                                                size="small"
                                                readOnly
                                            />
                                        </div>
                                        <div className="text-xs text-gray text-uppercase mt-3">
                                            {m.startDate} ~{m.endDate}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Complete;