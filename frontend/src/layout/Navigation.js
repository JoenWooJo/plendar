import React, { useState, Component } from 'react';
import '../assets/css/plendar.css';
import '../assets/scss/sb-admin-2.scss';
import { NavLink } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ComputerIcon from '@mui/icons-material/Computer';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import jwt_decode from "jwt-decode";



export default class Navigation extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            img: null
        }
    }

    /**
     *
     *  props로 받아온 값을 state에 동기화 한다.
     */
     static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(`[MOUNT02][UPDATE01]: getDerivedStateFromProps(nextProps=${nextProps.profileImg}, prevState=${prevState.img})`);
        return nextProps.profileImg !== prevState.profileImg ? {img: nextProps.profileImg} : null;
    }

    /**
     *
     *  props state을 변경 했을 때, re-rendering 여부(반환값 true: 한다. false: 안한다)를 결정한다.
     *  현재 데이터: this.props, this.state
     *  변경 데이터: nextProps, nextState
     *  로 접근 가능하다.
     *
     *  컴포넌트 성능 최적화(튜닝)에 사용할 수 있다.
     */
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(`[UPDATE02]: shouldComponentUpdate(nextProps=${nextProps.profileImg}, nextState=${nextState.img}) /// ${nextState.img == this.state.img}`);
        // console.log(">>> ", this.state.img)
        return !(nextState.img == this.state.img);
    }

    render() {
        const decode = jwt_decode(localStorage.getItem("Authorization"));
        
        return (
        <ul className=" bg-gradient-primary sidebar sidebar-dark col-xl-2">
            <NavLink className="sidebar-brand align-items-center justify-content-center "
                to={"/project/myproject"}> <h1>plendar</h1> </NavLink>

            <hr className="sidebar-divider" />


            <div className="text-center mt-5 2">
                <img src={decode["profile"]} style={{ height: '200px', width: '200px', borderRadius: '70%' }}></img>
                <br /><br />
                <div className="text-light "><h6>{decode["name"]} &nbsp; 님</h6><br /></div>
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
                        to={'/fileSharing/fileSharing'}>
                        <AttachFileIcon fontSize="large" />  &nbsp; File Sharing
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

            </div>
        </ul>
        )
    }
}

        
    
