import React from 'react';

const HeaderDropdown = () => {
    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    유진에게
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className= "rounded=circle" width="18"eight="12" src="/img/arlam.png"></img>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">안녕나야.. 잘 지내니??</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img width="18"eight="12" src="/img/arlam.png"/>
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">요즘 날씨 많이 춥대;;</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img width="18"eight="12" src="/img/arlam.png"/>
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">요즘 감기 독하던데.. 감기 조심 하고~</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img width="18"eight="12" src="/img/arlam.png"/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">나이제 센텀월드 횡단보도 앞이야!!!</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                            </div>
        </div>
    );
};

export default HeaderDropdown;