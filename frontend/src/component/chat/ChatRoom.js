import React, { useEffect, useState } from 'react';

import ModalChat from './ModalChat';
import Badge from '@mui/material/Badge';
import axios from 'axios';


const ChatRoom = ({selected, chatRoomName, roomNo, callback, notice, receiveRoomList, roomIdSelected, messages}) => {
    
    const [invisible, setInvisible] = useState(true);

    const roomClick = () => {
        callback(roomNo);
    };

    const handleBadgeVisibility = (bool) => {
        setInvisible(bool);
    };


    useEffect(()=>{
        // receiveRoomList.map((e,i) => {
        //     if((roomNo === e) && (roomIdSelected !== roomNo)) {
        //         console.log(roomNo, "번 방에 알림 있음");
        //         handleBadgeVisibility(false);
        //     } else if ((roomNo === e) && (roomIdSelected === roomNo)) {
        //         handleBadgeVisibility(true);
        //         receiveRoomList.splice(i,1);
        //     }
        // }) 
        async function fetchAndNotice() {
            const resp = await axios.get('/api/chat/notice', {
                params: {
                roomId: roomNo,
                roomIdSelected: roomIdSelected
                }
            })
                
            console.log("roomNo roomIdSelected notice", roomNo, roomIdSelected, resp.data.data);
            resp.data.data["notice"] === 1 ? setInvisible(false) : setInvisible(true)
        }
        fetchAndNotice();

    }, [messages])

    
    return (
        <li className="p-2 border-bottom">
            <div className="d-flex justify-content-between" style={{backgroundColor: selected ? "#EFEFFA" : "#fff", borderRadius: "10px"}} >
                <div className="d-flex flex-row" onClick={roomClick}>
                    <div style={{paddingTop: "5px"}}>
                        <Badge id={roomNo} color="error" variant="dot" invisible={invisible}>
                            <img src="/images/user.png" alt="" style={{ width: "50px" }} />
                        </Badge>
                    </div>
                    
                    <div className="pt-1 ml-2">
                        <p className="fw-bold mb-0">{chatRoomName}</p>
                        <p className="small text-muted">Hello, Are you there?</p>
                    </div>
                </div>
                <div className="pt-1" >
                    <ModalChat roomNo={roomNo}/>
                    <p className="small text-muted mb-2">Just now</p>
                </div>
            </div>
        </li>
    );
};

export default ChatRoom;