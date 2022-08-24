import React from 'react';

import SearchBar from './SearchBar';
import ChatRoom from './ChatRoom';


const ChatRoomList = ({callback, chatRoomId, roomList, newRoomList , setNewRoomList}) => {

    return (
        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 p-3">
            {/**검색바 */}
            <SearchBar roomList={roomList} setNewRoomList={setNewRoomList}/>
            <div className="bar" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
                <ul className="list-unstyled mb-0">
                    {/**채팅방 */
                        newRoomList.map((e) => (
                            <ChatRoom
                                key={e.no}
                                selected={e.no === chatRoomId}
                                chatRoomName={e.title}
                                roomNo={e.no}
                                callback={callback}/>
                        ))                            
                    }
                </ul>
            </div>
        </div>
    );
};

export default ChatRoomList;