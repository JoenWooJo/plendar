import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    return (
        <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">

            <div class="input-group rounded col-xl-3">
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span class="input-group-text border-0" id="search-addon">
                    <SearchIcon/>
                </span>
            </div>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link to="/chat" className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <MessageRoundedIcon />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </Link>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <AccessAlarmIcon />
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item logout botton">
                    <a className="nav-link " href="/login" id="usrlogout" role="button"
                        data-toggle="botton" aria-haspopup="true" aria-expanded="false" >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Header;