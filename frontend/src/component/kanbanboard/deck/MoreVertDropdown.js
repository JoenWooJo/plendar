import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateCard from '../card/CreateCard';
import "../../../assets/css/font.css";

const MoreVertDropdown = ({ projectNo, deckNo, cardNo, setCardList, setRefresh, setMorevertList, manager }) => {

    const [show, setShow] = useState(false);

    const delteDeck = async () => {
        const resp = await axios.delete(`/api/kanban/deck/delete/${projectNo}/${deckNo}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        })
    };

    return (
        <div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show "
                aria-labelledby="alertsDropdown">
                <div className="dropdown-item d-flex align-items-right" type="button" onClick={() => {
                    setShow(show => !show)
                }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>
                    카드 추가하기
                </div>
                <CreateCard
                    show={show}
                    setShow={setShow}
                    projectNo={projectNo}
                    no={deckNo}
                    cardNo={cardNo}
                    setCardList={setCardList}
                    setRefresh={setRefresh}
                    setMorevertList={setMorevertList}
                />
                { manager.length != 0 &&
                <Link className="dropdown-item d-flex align-items-right" to={`/kanbanboard/${projectNo}`} onClick={() => delteDeck()}  style={{fontFamily: "IBMPlexSansKR-Regular"}}>
                    삭제
                </Link>
                }
            </div>
        </div>
    );
};

export default MoreVertDropdown;