import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SmsIcon from '@mui/icons-material/Sms';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/bar.css';

const HeaderDropdown = ({ alramList, setClick }) => {

    const alramClick = async (alram) => {
        // notice => 삭제
        await axios.delete(`/api/notice/delete/${alram.no}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        });
        setClick(click=>!click);
    };

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
                aria-labelledby="alertsDropdown">
                <h4 className="dropdown-header" style={{fontFamily: "IBMPlexSansKR-Regular"}}>
                   NOTICE
                </h4>
                <div className="bar" style={{ height: alramList.length<3?"180px":"400px" , overflow: "auto", paddingTop: "0" }}  data-mdb-perfect-scrollbar="true">
                {
                    alramList.map((e, i) => {
                        let to = e.type == "card" || e.type == "cardDelete" || e.type == "comment" ? `/kanbanboard/${e.projectNo}` : e.type == "finished" ? "/project/completepage" : "/project/myproject";
                        let state = e.type == "card" || e.type == "cardDelte" ?  {cardNo: e.cardNo, type: e.type} : 
                        e.type == "comment" ? {cardNo: e.cardNo, type: e.type, noticeNo: e.no}: 
                        {projectNo: e.projectNo, type: e.type};
                        return (
                        
                            <Link key={i} to={to} state={state} className="dropdown-item d-flex align-items-center" onClick={()=>alramClick(e)}>
                                <div className="dropdown-list-image mr-3">
                                    <Badge color={e.type=="update"?"warning":e.type=="finished" ? "success" : "primary"} variant="dot">
                                        {e.type=="create"?<CreateNewFolderIcon fontSize='large'/>:e.type=="card"?
                                        <NoteAddIcon fontSize='large' />: e.type=="comment"?
                                        <SmsIcon fontSize='large' /> : e.type == "finished" ?
                                        <CheckCircleOutlineIcon fontSize='large' />:
                                        <PublishedWithChangesIcon fontSize='large' />}
                                    </Badge>
                                </div>
                                <div className="font-weight-bold">
                                    <div style={{fontFamily: "IBMPlexSansKR-Regular"}}>{e.message}</div>
                                    <div className="small text-gray-500" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{(e.time).slice(0, -5)}</div>
                                </div>
                                
                            </Link>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
};

export default HeaderDropdown;