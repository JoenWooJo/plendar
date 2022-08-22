import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
// import '../../assets/css/bar.css';

import SiteLayout from '../../layout/SiteLayout';
import ChatRoomList from './ChatRoomList';
import ChatMessageList from './ChatMessageList';


const Chat = () => {
    const [roomIdSelected, setRoomIdSelected] = useState(-1);
    const [roomList, setRoomList] = useState([]);
    
    const client = useRef({});

    const [messages, _setMessages] = useState([]);
    const messagesRef = useRef(messages);

    const setMessages = (messages) => {
        messagesRef.current = messages;
        _setMessages(messages);
    }

    const [subStatus, setSubStatus] = useState([roomIdSelected]);

    const changeRoomIdSelected = (id) => {
        console.log("chatRoomId: "+id);
        setRoomIdSelected(id); 
    };

    useEffect(()=>{
        console.log("!!!!!");
        axios.get('http://localhost:8080/api/chat/rooms')
            .then((resp)=>{
            setRoomList(resp.data.data);
        })
        
        connect();

        return () => {
            disconnect();
          };
    },[]);

    
    useEffect(() => {
        if (roomIdSelected == -1) {
            console.log("아직 방 안생김");
            return;
        }
        console.log("여기");
        if (roomIdSelected != -1) {
            setMessages([]);
        }
        setSubStatus([...subStatus, roomIdSelected]);
    }, [roomIdSelected]);

    useEffect(()=>{
        !subStatus.includes(roomIdSelected) && subscribe()
        
    }, [roomIdSelected, subStatus]);

    const connect = () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws/chat"),
            connectHeaders: {
                "auth-token": "spring-chat-auth-token",
            },
            debug: function (str) {
                console.log("!!!!!!", str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!연결??!");
                
            },
            onStompError: (frame) => {
                console.error(frame);
            }
        });

        client.current.activate();
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const subscribe = () => {
        console.log("여기");
        client.current.subscribe(`/topic/chat/room/${roomIdSelected}`, (data) => {
            console.log("데이터가 온다", JSON.parse(data.body));
            const chatting = JSON.parse(data.body);
            setMessages([...messagesRef.current, chatting]);
        });
    };

    // const unsubscribe = () => {
    //     client.current.unsubscribe();
    // }

    const publish = async (sender, line) => {
        if (!client.current.connected) {
            return;
        }

        let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
        let time = {
            year: today.getFullYear(), //현재 년도
            month: today.getMonth() + 1, // 현재 월
            date: today.getDate(), // 현재 날짜
            hours: today.getHours(), //현재 시간
            minutes: ("0" + today.getMinutes()).slice(-2), //현재 분 ('0'+minutes).slice(-2)
            seconds: ("0" + today.getSeconds()).slice(-2)
        };
        //let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;
        
        client.current.publish({
            destination: `/app/chat/message`,
            body: JSON.stringify({
                roomId: roomIdSelected,
                message: line,
                sender: sender,
                dateTime: `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${time.minutes}`
            }),
        });

        
        
    };


    return (
        <SiteLayout>
            <div className='col-xl-11 ml-4'>
                    <div className="card mt-5">
                        <div className="card-body row" id="chat3" style={{ borderRadius: '15px' }}>
                            { /**컴포넌트,,? */}
                            <ChatRoomList 
                                callback={changeRoomIdSelected}
                                chatRoomId={roomIdSelected} 
                                roomList={roomList} />
                            <ChatMessageList
                                messages={messages}
                                chatRoomId={roomIdSelected}
                                publish={publish} />
                        </div>
                    </div>
            </div>
        </SiteLayout>
    );
};

export default Chat;