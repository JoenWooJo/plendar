import React from 'react';
import '../assets/css/plendar.css';
import '../assets/scss/sb-admin-2.scss';
import { NavLink } from 'react-router-dom';

const Navigation = ({active}) => {
    return (
        <ul className="navbar-nav bg-gradient-primary1 sidebar sidebar-dark accordion col-xl-2" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center " 
                     to={"/component"}> <h3>plendar</h3> </NavLink>

            <hr className="sidebar-divider my-0" />

            
            <div className="text-center mt-5">
                <img src="/img/exprofile.png" style={{width:'150px'}}></img>
            <br/><br/>
            <div className="text-light">전우조 님</div>
            </div>
           
           <div className='ml-3'>
            <li className="nav-item active">
                <NavLink className="nav-link" 
                         to={'/user/mypage'}> 
                         <i className="fas fa-fw fa-tachometer-alt"></i>
                         My page 
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
                         to={'/calendar/team'}> 
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

            </div>
            </ul>
     );
};

export default Navigation;