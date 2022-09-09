import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SmsIcon from '@mui/icons-material/Sms';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/bar.css';

const HeaderDropdown = ({ alramList, setClick }) => {

    const alramClick = async (alram) => {
        console.log("alram>>",alram)
        // notice => 삭제
        // const resp = await axios.delete(`/api/notice/delete/${alram.no}`);
        setClick(click=>!click);
    };

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
                aria-labelledby="alertsDropdown">
                <h4 className="dropdown-header">
                   NOTICE
                </h4>
                <div className="bar pt-3 pe-3" style={{ height: "600px", "overflow": "auto" }}  data-mdb-perfect-scrollbar="true">
                {
                    alramList.map((e, i) => {
                        let to = e.type == "card" || e.type == "cardDelete" || e.type == "comment" ? `/kanbanboard/${e.projectNo}` : "/project/myproject";
                        let state = e.type == "card" || e.type == "cardDelte" ?  {cardNo: e.cardNo, type: e.type} : 
                        e.type == "comment" ? {cardNo: e.cardNo, type: e.type, noticeNo: e.no}:
                        {projectNo: e.projectNo, type: e.type};
                        return (
                        
                            <Link key={i} to={to} state={state} className="dropdown-item d-flex align-items-center" onClick={()=>alramClick(e)}>
                                <div className="dropdown-list-image mr-3">
                                    <Badge color={e.type=="update"?"warning":"primary"} variant="dot">
                                        {e.type=="create"?<CreateNewFolderIcon fontSize='large'/>:e.type=="card"?
                                        <NoteAddIcon fontSize='large' />: e.type=="comment"?
                                        <SmsIcon fontSize='large' /> :
                                        <PublishedWithChangesIcon fontSize='large' />}
                                    </Badge>
                                </div>
                                <div className="font-weight-bold">
                                    <div className="text-truncate">{e.message}</div>
                                    <div className="small text-gray-500">{e.time}</div>
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