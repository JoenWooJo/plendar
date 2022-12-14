import React from 'react';

import SearchBar from './SearchBar';
import ChatRoom from './ChatRoom';


const ChatRoomList = ({callback, roomIdSelected, roomList, newRoomList , setNewRoomList, setNoticeSelected, messages, line}) => {
    document.getElementById("selectedRoom") != null && document.getElementById("selectedRoom").scrollIntoView({behavior: "smooth"});

    return (
        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 p-3">
            {/**검색바 */}
            <SearchBar roomList={roomList} setNewRoomList={setNewRoomList}/>
            <div className="bar" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '500px' }}>
                <ul className="list-unstyled mb-0">
                    {/**채팅방 */
                        newRoomList.map((e) => (
                            <ChatRoom
                                key={e.no}
                                selected={e.no === roomIdSelected}
                                chatRoomName={e.title}
                                roomNo={e.no}
                                roomIdSelected={roomIdSelected}
                                messages={messages}
                                lines={line}
                                setNoticeSelected={setNoticeSelected}
                                callback={callback}/>
                        ))                            
                    }
                </ul>
            </div>
        </div>
    );
};

export default ChatRoomList;