import React from 'react';

// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
// import '../../assets/css/bar.css';

import SearchBar from './SearchBar';
import ChatRoom from './ChatRoom';


const ChatRoomList = ({callback, chatRoomId, roomList}) => {

    return (
        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 p-3">
            {/**검색바 */}
            <SearchBar />
            <div className="bar" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
                <ul className="list-unstyled mb-0">
                    {/**채팅방 */
                        roomList.map((e) => (
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