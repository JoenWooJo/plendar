import React from 'react';
import "../../assets/css/font.css";

const ChatMessageSend = ({content, date, time}) => {
    
    return (
        <div className="d-flex flex-row justify-content-end">
            <div style={{marginRight:'15px'}}>
                <p className=" p-2 me-3 mb-1 text-white rounded-3 bg-primary" style={{borderRadius:'15px',marginRight:'5px', fontFamily: "IBMPlexSansKR-Regular"}}>
                    {content}</p>
                <p className="small me-3 mb-3 rounded-3 text-muted" style={{marginRight:'5px', fontFamily: "IBMPlexSansKR-Regular"}}>{time} | {date}</p>
            </div>
            {/* <img src={localStorage.getItem("loginUserProfile")}
                alt="avatar 1" style={{ width: '45px', height: '45px', borderRadius:'70%', marginRight:'10px'}} /> */}
        </div>
    );
};

export default ChatMessageSend;