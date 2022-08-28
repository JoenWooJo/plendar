import React from 'react';
import '../assets/css/plendar.css';
import '../assets/scss/sb-admin-2.scss';
import { NavLink } from 'react-router-dom';

const Navigation = ({ active }) => {
    return (
        <ul className="navbar-nav bg-gradient-primary1 sidebar sidebar-dark accordion col-xl-2" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center "
                to={"/component"}> <h3>plendar</h3> </NavLink>

            <hr className="sidebar-divider my-0" />


            <div className="text-center mt-5">
                <img src={localStorage.getItem("loginUserProfile")} style={{ width: '150px', borderRadius: '20%' }}></img>
                <br /><br />
                <div className="text-light">{localStorage.getItem("loginUserName")} 님</div>
            </div>
            <div className='ml-3'>
                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/user/mypagechecked'}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        My Page
                    </NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/calendar/team'}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        Calendar
                    </NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link"
                        to={'/project/myproject'}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        My Project
                    </NavLink>
                </li>
            </div>

            {
                active == 'user/mypage' ?
                    <li className="nav-item active">
                        <NavLink className="nav-link"
                            to={'/user/mypagechecked'}>
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            myyyypage
                        </NavLink>
                    </li> : null
            }
        </ul>
    );
};

export default Navigation;