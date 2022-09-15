import React from 'react';
import "../../assets/css/font.css";

const ChatMessageReceive = ({name, content, date, time, profile}) => {
    
    return (
        <div className={`d-flex flex-row justify-content-start`}>
            <img src={profile}
                alt="avatar 1" style={{ width: '45px', height: '45px', borderRadius:'70%' }} />
            <p style={{width: '35px', height: '100%', fontSize:'5px', fontFamily: "IBMPlexSansKR-Regular"}} >{name}</p>
            <div>
                <p className="p-2 ms-1 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7', borderRadius:'15px', fontFamily: "IBMPlexSansKR-Regular"}}>
                    {content}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{time} | {date}</p>
            </div>
        </div>


    );
};

export default ChatMessageReceive;