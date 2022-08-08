import React from 'react';
import '../assets/scss/sb-admin-2.scss';

const Header = () => {
    return (
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">
                    {/* <!-- Topbar --> */}
                        {/* <!-- Topbar Navbar --> */}
                        <ul className="navbar-nav ml-auto">
                            {/* <!-- Nav Item - Alerts --> */}
                            <li className="nav-item dropdown no-arrow mx-1">
                                
                                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-bell fa-fw"></i>
                                    {/* <!-- Counter - Alerts --> */}
                                    <span className="badge badge-danger badge-counter">3+</span>
                                </a>
                                {/* <!-- Dropdown - Alerts --> */}
                            </li>
                            {/* <!-- Nav Item - Messages --> */}
                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-envelope fa-fw"></i>
                                    {/* <!-- Counter - Messages --> */}
                                    <span className="badge badge-danger badge-counter">7</span>
                                </a>
                            </li>
                            <div className="topbar-divider d-none d-sm-block"></div>

                            {/* <!-- Nav Item - User Logout Botton--> */}
                            <li className="nav-item logout botton">
                                <a className="nav-link " href="/pages/Login" id="usrlogout" role="button"
                                    data-toggle="botton" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">logout</span>
                                </a>
                            </li>
                        </ul>
                    {/* <!-- End of Topbar --> */}
                    </div>
    );

};

export default Header;