import React from 'react';

const MoreVertDropdown = () => {
    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show "
                                aria-labelledby="alertsDropdown">
                                <a className="dropdown-item d-flex align-items-right" href="./updateProject">
                                        <div className="status-indicator bg-success"></div>
                                   수정
                                </a>
                                <a className="dropdown-item d-flex align-items-right" href="#">
                                        <div className="status-indicator"></div>
                                    삭제
                                </a>
                            </div>
        </div>
    );
};

export default MoreVertDropdown;