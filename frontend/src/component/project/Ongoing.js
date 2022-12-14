import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";

import '../../assets/css/font.css';

const Ongoing = ({
    no,
    title,
    description,
    endDate,
    finished,
    priority,
    startDate,
    state,
    leader
}) => {

    
    const [morevertList, setMorevertList] = useState(false);
    const projectData = {
        no: no,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        priority: priority
    }
    // require("/assets/images/update.png").default
    // require("/assets/images/new.png").default
    let projectNo = state != null ? state["projectNo"] : "";
    let alramType = state != null ? state["type"] : "";
    

    return (
        <div className="col-xl-3  mb-4" key={no}  >
            <div className="card border-left-primary shadow h-100 py-2">
                {
                    (projectNo == no && alramType == "update") ? <span><img id={"proj-new-img"} className="mb-3 ml-1" src="/assets/images/update.png"
                    alt="" style={{ position: "absolute", width: "30px", left: "75%", marginBottom: "5px" }} /></span>  : (projectNo == no && (alramType == "create" || alramType == "onGoing")) ? 
                    <span><img id={"proj-new-img"} className="mb-3 ml-1" src="/assets/images/new.png"
                                    alt="" style={{ position: "absolute", width: "30px", left: "75%", marginBottom: "5px" }} /></span>: ""
                }
                <div className="card-body" >
                    <div className="row no-gutters align-items-center" >
                        <div className="col mr-2">
                            <div className='row'>
                                <div className="col-xl-10 text-xs font-weight-bold text-primary text-uppercase mb-1" style={{fontFamily: "IBMPlexSansKR-Regular"}}>진행중</div>
                                <div className=" col-xl-2 nav-link" role="button" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" style={{ float: 'right' }} >
                                    {
                                        !!leader && leader === 1 ? (<> 
                                        <MoreVertIcon onClick={e => { setMorevertList(morevertList => !morevertList) }} />
                                        {morevertList ? <MoreVertDropdown projectNo={no} projectData={projectData} /> : null}
                                        </>) : <div>&nbsp;</div>
                                    }
                                </div>
                            </div>
                            <Link to={`/kanbanboard/${no}`} className="h5 mb-0 font-weight-bold text-gray-800" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{title}</Link>
                            <div className='mt-3'>
                                <Rating
                                    name="read-only"
                                    value={priority}
                                    size="small"
                                    readOnly
                                />
                            </div>
                            <div className="text-xs text-gray text-uppercase mt-3" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{startDate} ~{endDate}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ongoing;