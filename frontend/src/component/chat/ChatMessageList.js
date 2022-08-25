import React, { useEffect, useState } from "react";

import '../../assets/css/bar.css';

import ChatMessageReceive from "./ChatMessageReceive";
import ChatMessageSend from "./ChatMessageSend";



const ChatMessageList = ({ chatRoomId, messages, publish }) => {
    useEffect(() => {
        if (messages.length !== 0) {
            document.getElementById('chatList').scrollTop = document.getElementById('chatList').scrollHeight;
        }
    }, [messages])

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="col-md-6 col-lg-7 col-xl-8" >
            {chatRoomId != -1 ? (
                <div>
                    <div
                        id="chatList"
                        className="bar pt-3 pe-3"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "400px" }}>
                        {
                            messages.map((msg, i) => {
                                const date = msg["sendTime"].split(" ")[0];
                                const time = msg["sendTime"].split(" ")[1];
                                return msg.sender == localStorage.getItem("loginUserNo") ?
                                    <ChatMessageSend key={i} content={msg.message} date={date.split("-")[1] + '월' + date.split("-")[2] + '일'} time={time.split(":")[0] + ":" + time.split(":")[1]} /> :
                                    <ChatMessageReceive key={i} name={msg.senderName} content={msg.message} date={date.split("-")[1] + '월' + date.split("-")[2] + '일'} time={time.split(":")[0] + ":" + time.split(":")[1]} />
                            })
                        }
                    </div>

                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput2"
                            placeholder="message ...."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => { e.key == "Enter" && publish(e.target.value) && setMessage('') }}
                            style={{textSizeAdjust: "5px"}}
                        />
                        <button className="ms-3" style={{border: "none", backgroundColor: "#fff" }} onClick={() => message != '' && publish(message) && setMessage('')}>
                            <img src="/images/envelope.png" alt="" style={{ width: "60px", height: "100%", paddingLeft: "5px"}} />
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <img src="/images/chatImage.svg" alt="" style={chatImage} />
                </div>
            )}
        </div>
    );
};

const chatImage = {
    padding: '50px',
    position: "absolute",
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
}

export default ChatMessageList;
