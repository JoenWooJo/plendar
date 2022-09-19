import React, { useState, useEffect } from 'react';
import { Rating } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../assets/css/font.css';
import CompleteDropDown from './CompleteDropDown';


const Complete = ({ state, no, title, priority, startDate, endDate }) => {
    let projectNo = state != null ? state["projectNo"] : "";
    const [morevertList, setMorevertList] = useState(false);

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
                                <div className="text-xs font-weight-bold text-gray text-uppercase mb-1" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                                    완료</div>
                                <MoreVertIcon onClick={e => { setMorevertList(morevertList => !morevertList) }} />
                                {morevertList ? <CompleteDropDown projectNo={no} /> : null}
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
        </div>
    );
};

export default Complete;