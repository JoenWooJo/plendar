import React from 'react';
import '../assets/css/Plendar.css';
import '../assets/scss/navs/_sidebar.scss';


const Navigation = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
               <div>plendar</div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <a className="nav-link" href="">
                    <span>project</span></a>
            </li>


            <li className="nav-item active">
                <a className="nav-link" href="">
                    <span>my page</span></a>
            </li>

            <li className="nav-item active">
                <a className="nav-link" href="">
                    <span>Dashboard</span></a>
            </li>

            
        </ul>

     );
};

export default Navigation;