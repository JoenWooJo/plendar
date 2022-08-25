import React, { useEffect, useState } from 'react';

import ModalChat from './ModalChat';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


const ChatRoom = ({selected, chatRoomName, roomNo, callback, receiveRoom, roomIdSelected}) => {
    
    const [invisible, setInvisible] = useState(true);

    const roomClick = () => {
        callback(roomNo);
    };

    const handleBadgeVisibility = (bool) => {
        setInvisible(bool);
    };

    

    // useEffect(()=>{
    //     // console.log("채팅 알림?: ", "receviceRoom: ",receiveRoom, roomIdSelected);
    //     // if (receiveRoom != undefined && receiveRoom != roomIdSelected) {
    //     //     // setInvisible(false);
    //     //     handleBadgeVisibility(false);
    //     //     return;
    //     // }
    //     // // setInvisible(true);
    //     // handleBadgeVisibility(true);

    //     if(roomIdSelected === receiveRoom){
    //         // setInvisible(true);
    //         console.log("????");
    //     }

        

    // }, [receiveRoom])

    
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
                    <FormControlLabel
                    sx={{ color: 'text.primary' }}
                    control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
                    />
                </div>
            </div>
        </li>
    );
};

export default ChatRoom;