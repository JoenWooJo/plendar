import React, { useState, useEffect } from 'react';
import { Rating } from "@mui/material";

import '../../assets/css/font.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CompleteDropDown from './CompleteDropDown';


const Complete = ({ state, no, title, priority, startDate, endDate, leader }) => {
    let projectNo = state != null ? state["projectNo"] : "";
    const [morevertList, setMorevertList] = useState(false);

    useEffect(() => {
        const f = () => {
            let child = document.getElementById("proj-finished-img");
            child != null && child.parentNode.removeChild(child);
        }
        document.addEventListener("click", f);

        return () => {
            document.removeEventListener("click", f)
        }

    }, []);



    return (
        <div className="col-xl-3  mb-4">
            <div className="card border-left-secondary shadow h-100 py-2">
                <div className="card-body" >
                    {
                        projectNo == no &&
                        <span><img id={"proj-finished-img"} className="mb-3 ml-1" src="/assets/images/complete.png" alt="" style={{ position: "absolute", width: "30px", left: "75%", marginBottom: "5px" }} /></span>
                    }
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className='row'>
                                <div className="col-xl-10 text-xs font-weight-bold text-gray text-uppercase mb-1" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                                    완료</div>
                                <div className=" col-xl-2 nav-link" role="button" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" style={{ float: 'right' }} >
                                {
                                    !!leader && leader === 1 ? (<>
                                        <MoreVertIcon onClick={e => { setMorevertList(morevertList => !morevertList) }} />
                                        {morevertList ? <CompleteDropDown projectNo={no} /> : null}
                                    </>) : <div>&nbsp;</div>
                                }
                                </div>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>{title}</div>
                            <div className='mt-3'>
                                <Rating
                                    value={priority}
                                    size="small"
                                    readOnly
                                />
                            </div>
                            <div className="text-xs text-gray text-uppercase mt-3" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                                {startDate} ~{endDate}</div>
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

export default Complete;