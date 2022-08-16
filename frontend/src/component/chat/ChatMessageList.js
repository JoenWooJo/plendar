import React, { useState } from "react";

// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
import '../../assets/css/bar.css';

import ChatMessageReceive from "./ChatMessageReceive";
import ChatMessageSend from "./ChatMessageSend";



const ChatMessageList = ({chatRoomId, messages, publish}) => {
    
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="col-md-6 col-lg-7 col-xl-8">
           {chatRoomId != -1 ? (
                <div>
                    <div
                        className="bar pt-3 pe-3"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "400px" }}>
                        {chatRoomId}
                        {
                            messages.map((msg, i) => (
                                msg.sender == '나나' ? 
                                <ChatMessageSend key={i} content={msg.message} date={msg.date} time={msg.time}/>:
                                <ChatMessageReceive key={i} name={msg.sender} content={msg.message} date={msg.date} time={msg.time}/>
                            ))
                        }
                    </div>

                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 3"
                            style={{ width: "40px", height: "100%" }}
                        />
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput2"
                            placeholder="Type message"
                        />
                        <a className="ms-3" href="#!">
                            <img src="/images/plane.png" alt="" style={{ width: "30px" }} />
                        </a>
                    </div>
                    <div>
                        <input
                            type={"text"}
                            placeholder={"name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type={"text"}
                            placeholder={"메세지"}
                            value={message}
                            onChange={(e) => {
                                if (e.key === 'Enter') {
                                    publish(name, e.target.value);
                                    setMessage("");
                                    return;
                                }
                                setMessage(e.target.value);
                            }}
                        />
                        <button onClick={() => publish(name, message)}>send</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>방 클릭해주셈욤</h3>
                </div>
            )}
        </div>
    );
};

export default ChatMessageList;
