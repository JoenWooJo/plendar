import React, { useState } from 'react';
import axios from 'axios';
import '../assets/scss/sb-admin-2.scss';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import HeaderDropdown from './HeaderDropdown';

const Header = ({ }) => {
    const [alramList, setAlramList] = useState(false);
    const [count, setCount] = useState(0);

    const logoutClick = async () => {
        await axios.get('/api/user/logout')

        localStorage.removeItem("loginUserNo");
        localStorage.removeItem("loginUserEmail");
        localStorage.removeItem("loginUserName");
        localStorage.removeItem("loginUserProfile");

        window.location.replace("/login");

    };

    axios.get('/api/chat/notice/count')
        .then((resp) => {
            setCount(resp.data.data)
        }).catch((err) => {
            console.error(err);
        })

    return (
        <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">

            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                               <SearchIcon/>
                            </button>
                        </div>
                </div>
            </form>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link to="/chat" className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Badge color="error" badgeContent={count}>
                            <ChatIcon color="primary" fontSize="large" />
                        </Badge>
                    </Link>
                </li>

                <li className="nav-item dropdown no-arrow mx-1 ">
                    <div className="nav-link dropdown-toggle" href="#" role="button" id="alertsDropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" >
                        <AccessAlarmIcon color="primary" fontSize="large" onClick={e => { setAlramList(alramList => !alramList) }} />
                        <span className="badge badge-danger badge-counter">.</span>
                        {alramList ? <HeaderDropdown /> : null}
                    </div>

                </li>
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item logout botton">
                    <Link className="nav-link " to="/login" id="usrlogout" role="button"
                        data-toggle="botton" aria-haspopup="true" aria-expanded="false" onClick={logoutClick} >
                        <b className="d-lg-inline text-gray-600 mr-3">logout</b>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;