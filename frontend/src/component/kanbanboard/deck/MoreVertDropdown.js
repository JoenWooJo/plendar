import React, { useState } from 'react';
import CreateCard from '../card/CreateCard';

const MoreVertDropdown = ({projectNo, no, cardNo, setRefresh}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show "
                aria-labelledby="alertsDropdown">
                <a className="dropdown-item d-flex align-items-right" type="button" onClick={handleClose}>
                    <div className="status-indicator bg-success"></div>
                    카드 추가하기
                </a>
                <CreateCard 
                    show={show} 
                    setShow={setShow} 
                    projectNo={projectNo} 
                    no={no}
                    cardNo={cardNo}
                    setRefresh={setRefresh}
                />
                <a className="dropdown-item d-flex align-items-right" href="#">
                    <div className="status-indicator"></div>
                    삭제
                </a>
            </div>
        </div>
    );
};

export default MoreVertDropdown;