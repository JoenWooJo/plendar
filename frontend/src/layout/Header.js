import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import '../assets/css/dropdown-content.css';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    return (
        <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">

            <div className="input-group rounded col-xl-3">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
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
                    <div className="nav-link dropdown-toggle"  id="messagesDropdown" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className = "dropdown">
                            <img width="18"eight="12" src="/img/arlam.png"></img>
                            <form className="dropdown-content">
                                <a href="#">보고싶을때</a>
                                <a href="#">그리울때</a>
                                <a href="#">함께있을때</a>
                            </form>
                        </div>
                        <span className="badge badge-danger badge-counter">현석이가</span>
                    </div>
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