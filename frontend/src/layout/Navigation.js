import React from 'react';
import '../assets/css/plendar.css';
import '../assets/scss/sb-admin-2.scss';
import { NavLink } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ComputerIcon from '@mui/icons-material/Computer';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const Navigation = ({ active }) => {
    return (
        <ul className=" bg-gradient-primary sidebar sidebar-dark col-xl-2">
            <NavLink className="sidebar-brand align-items-center justify-content-center "
                to={"/project/myproject"}> <h1>plendar</h1> </NavLink>

            <hr className="sidebar-divider" />


            <div className="text-center mt-5 2">
                <img src={localStorage.getItem("loginUserProfile")} style={{ height: '150px', width: '150px', borderRadius: '20%' }}></img>
                <br /><br />
                <div className="text-light "><h6>{localStorage.getItem("loginUserName")} &nbsp; 님</h6><br /></div>
            </div>
            <hr className="sidebar-divider" />


            <div className='ml-3'>
                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/user/mypagechecked'}>
                        <PersonIcon fontSize="large" /> &nbsp; My Page
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/calendar/team'}>
                        <CalendarMonthIcon fontSize="large" />  &nbsp; Calendar
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />


                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/project/myproject'}>
                        <ComputerIcon fontSize="large" /> &nbsp; My Project
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/kanbanboard/kanban'}>
                        <BackupTableIcon fontSize="large" />  &nbsp; Kanban Board
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/fileSharing/fileSharing'}>
                        <AttachFileIcon fontSize="large" />  &nbsp; File Sharing
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

            </div>
        </ul>
    );
};

export default Navigation;