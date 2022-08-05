import React from 'react';
//import '../assets/css/Plendar.css';
//import '../assets/scss/navs/_sidebar.scss';
//import '../assets/vendor/bootstrap/scss/_navbar.scss';
import '../assets/scss/sb-admin-2.scss';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center " 
                     to={'/'}> plendar </NavLink>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/user/mypage'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         Mypage 
                </NavLink>
            </li>

            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/project/myproject'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         My Project 
                </NavLink>
            </li>

            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/kanbanboard/kanban'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         kanbanboard 
                </NavLink>
            </li>

            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/calendar/calendar'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         calendar 
                </NavLink>
            </li>

            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/fileSharing/fileSharing'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         fileSharing 
                </NavLink>
            </li>

            
        </ul>

     );
};

export default Navigation;