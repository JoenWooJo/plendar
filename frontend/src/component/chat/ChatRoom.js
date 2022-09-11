import React, { useEffect, useState } from 'react';

import ModalChat from './ModalChat';
import Badge from '@mui/material/Badge';
import axios from 'axios';

const ChatRoom = ({selected, chatRoomName, roomNo, callback, roomIdSelected, messages}) => {
    
    const [invisible, setInvisible] = useState(true);
    const [lastMessage, setLastMessage] = useState({});
    const [time, setTime] = useState('');

    const roomClick = () => {
        callback(roomNo);
    };

    const fetchAndNotice = async () => {
        const resp = await axios.get('/api/chat/notice', {
            params: {
            roomId: roomNo,
            roomIdSelected: roomIdSelected
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        })
            
        // console.log("roomNo roomIdSelected notice", roomNo, roomIdSelected, resp.data.data);
        resp.data.data["notice"] === 1 ? setInvisible(false) : setInvisible(true)
    }

    const getLastMessage = async () => {
        const resp = await axios.get('/api/chat/last/message', {
            params: {
                roomId: roomNo
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        })
        if(resp.data.data != null ){
            setLastMessage(resp.data.data);
            let data = resp.data.data["sendTime"].split(" ")[1]
            let getTime = data.split(":")[0] + ":" + data.split(":")[1]
            setTime(getTime);
        }
        
    }

    useEffect(()=>{
        fetchAndNotice();
        getLastMessage();
    }, [lastMessage, messages, time]);
    
    return (
        <li className="p-2 border-bottom">
            <div className="d-flex justify-content-between" style={{backgroundColor: selected ? "#EFEFFA" : "#fff", borderRadius: "10px"}} >
                <div className="d-flex flex-row" onClick={roomClick}>
                    <div style={{paddingTop: "5px"}}>
                        <Badge id={roomNo} color="error" variant="dot" invisible={invisible}>
                            <img src="/images/defaultProfile.png" alt="" style={{ width: "50px", borderRadius:"70%"}} />
                        </Badge>
                    </div>
                    
                    <div className="pt-1 ml-2">
                        <p className="fw-bold mb-0">{chatRoomName}</p>
                        <p className="small text-muted" style={{fontSize: "7px", marginTop: "5px"}}>{lastMessage != null && lastMessage["message"]}</p>
                    </div>
                </div>
                <div className="pt-1" >
                    <ModalChat roomNo={roomNo} />
                    <div>
                        <p className="small text-muted mb-2" style={{fontSize: "3px", marginTop: "30px"}}>{lastMessage != null && time}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ChatRoom;