import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Badge from '@mui/material/Badge';

const HeaderDropdown = ({ alramList }) => {
    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
                aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                    Notice
                </h6>
                {/**
                                 * <div className="status-indicator bg-success"></div>
                                 * className => bg-success 초록불 / bg-warning 노란불 / bg-primary 파란불
                                 */}

                {
                    alramList.map((e, i) => {
                        return (
                            <a key={i} className="dropdown-item d-flex align-items-center" href="#">
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
                        </a>
                        )
                    })


                }
                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
            </div>
        </div>
    );
};

export default HeaderDropdown;