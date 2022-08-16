import React from 'react';

const ChatMessageSend = ({content, date, time}) => {
    
    return (
        <div className="d-flex flex-row justify-content-end">
            <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary" >
                    {content}</p>
                <p className="small me-3 mb-3 rounded-3 text-muted">{time} | {date}</p>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar 1" style={{ width: '45px', height: '100%' }} />
        </div>
    );
};

export default ChatMessageSend;