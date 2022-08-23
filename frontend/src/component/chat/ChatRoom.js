import axios from 'axios';
import React from 'react';
import Modal from '@mui/material/Modal';
import ModalChat from './ModalChat';
// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
// import '../../assets/css/bar.css';


const ChatRoom = ({selected, chatRoomName, roomNo, callback}) => {
    console.log(selected, chatRoomName, roomNo);

    const roomClick = () => {
        callback(roomNo);
    };

    const memberListClick = () => {
        console.log(roomNo);
        axios.get('/api/chat/room/member', {
            params: {
              no: roomNo
            }
          })
            .then((resp)=>{
                console.log(resp.data.data);
            }).catch((err)=>{
                console.error(err);
            })
    }

    return (
        <li className="p-2 border-bottom">
            <div className="d-flex justify-content-between" style={{backgroundColor: selected ? "#EFEFFA" : "#fff", borderRadius: "10px"}} >
                <div className="d-flex flex-row" onClick={roomClick}>
                    <div >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar" className="d-flex align-self-center me-3" width="60" />
                    </div>
                    
                    <div className="pt-1 ml-2">
                        
                        <p className="fw-bold mb-0">{chatRoomName}</p>
                        <p className="small text-muted">Hello, Are you there?</p>
                    </div>
                </div>
                <div className="pt-1">
                   <ModalChat />
                    <button onClick={memberListClick}>:</button>
                    <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger rounded-pill float-end">3</span>
                </div>
            </div>
        </li>
    );
};

export default ChatRoom;