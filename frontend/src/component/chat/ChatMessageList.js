import React, { useEffect, useState } from "react";

import '../../assets/css/bar.css';
import ChatMessageNotice from "./ChatMessageNotice";
import ChatMessageReceive from "./ChatMessageReceive";
import ChatMessageSend from "./ChatMessageSend";


const ChatMessageList = ({ roomIdSelected, messages, publish }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (document.getElementById('chatList') != null) {
            document.getElementById('chatList').scrollTop = document.getElementById('chatList').scrollHeight;
        }
    }, [messages])

    return (
        <div className="col-md-6 col-lg-7 col-xl-8" >
            {roomIdSelected != -1 ? (
                <div>
                    <div
                        id="chatList"
                        className="bar pt-3 pe-3"
                        style={{ position: "relative", height: "500px" }}>
                        {
                            messages.map((msg, i) => {
                                const date = msg["sendTime"].split(" ")[0];
                                const time = msg["sendTime"].split(" ")[1];
                                return msg.sender == localStorage.getItem("loginUserNo") ?
                                    <ChatMessageSend 
                                        key={i} 
                                        content={msg.message} 
                                        date={date.split("-")[1] + '월' + date.split("-")[2] + '일'} 
                                        time={time.split(":")[0] + ":" + time.split(":")[1]} 
                                    /> : msg.sender == 1 ? <ChatMessageNotice key={i} notice={msg.message}/> :
                                    <ChatMessageReceive 
                                        key={i} 
                                        name={msg.senderName} 
                                        content={msg.message} 
                                        date={date.split("-")[1] + '월' + date.split("-")[2] + '일'} 
                                        time={time.split(":")[0] + ":" + time.split(":")[1]} 
                                        profile={msg.senderProfile}
                                    />
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
                            style={{textSizeAdjust: "5px", fontFamily: "IBMPlexSansKR-Regular"}}
                        />
                        <button className=" mt-1" style={{border: "none", backgroundColor: "#fff" }} onClick={() => message != '' && publish(message) && setMessage('')}>
                            <img src="assets/images/envelope.png" alt="" style={{ width: "60px", height: "60px"}} />
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <img src="assets/images/chatImage.svg" alt="" style={chatImage} />
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
