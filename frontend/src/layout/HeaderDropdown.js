import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeaderDropdown = ({ alramList, setClick }) => {

    const alramClick = async (alram) => {
        console.log("alram>>",alram)
        // notice => 삭제
        const resp = await axios.delete(`/api/notice/delete/${alram.no}`);
        console.log(resp.data);
        setClick(click=>!click);
    };

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
                aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                    Notice
                </h6>
                
                {
                    alramList.map((e, i) => {
                        return (
                            <Link key={i} to={`/kanbanboard/${e.projectNo}`} state={{cardNo: e.cardNo}} className="dropdown-item d-flex align-items-center" onClick={()=>alramClick(e)}>
                                <div className="dropdown-list-image mr-3">
                                    <Badge color={e.type=="update"?"warning":"primary"} variant="dot">
                                        {e.type=="create"?<CreateNewFolderIcon fontSize='large'/>:e.type=="card"?
                                        <NoteAddIcon fontSize='large' />:
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
                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
            </div>
        </div>
    );
};

export default HeaderDropdown;