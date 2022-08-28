import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

import SiteLayout from '../../layout/SiteLayout';
import ChatRoomList from './ChatRoomList';
import ChatMessageList from './ChatMessageList';


const Chat = () => {
    const [roomIdSelected, setRoomIdSelected] = useState(-1);

    const [roomList, setRoomList] = useState([]);
    const [newRoomList, setNewRoomList] = useState([]);
    
    const client = useRef({});

    const [messages, _setMessages] = useState([]);
    const messagesRef = useRef(messages);

    const setMessages = (messages) => {
        messagesRef.current = messages;
        _setMessages(messages);
    }

    const [chatting, setChatting] = useState({});
    const [receiveChatCount, setReceiveChatCount] = useState(0);
    const [notice, setNotice] = useState();

    const [subStatus, setSubStatus] = useState([roomIdSelected]);

    const changeRoomIdSelected = (id) => {
        setRoomIdSelected(id); 
    };

    useEffect(() => {
        async function fetchAndSetRooms() {
            connect();
            const resp = await axios.get('/api/chat/rooms');
            const rooms = resp.data.data;
            if (resp.data.result == "fail") {
                alert(resp.data.message);
                window.location.replace("/login");
            }
            rooms.map((e)=>{
                setSubStatus([...subStatus, e.no]);
                subscribe(e.no);
                setNotice(e.notice);
            });

            setNewRoomList(resp.data.data);
            setRoomList(resp.data.data);
        } 
        fetchAndSetRooms();


        // return () => {
        //     disconnect();
        // };
    },[]);

    
    useEffect(() => {
        async function fetchAndMessageList(roomId) {
            const resp = await axios.get('/api/chat/room/messages', {
                params: {
                  roomId: roomId
                }
            })
            setMessages(resp.data.data);
        }
        if (roomIdSelected == -1) {
            return;
        }
        if (roomIdSelected != -1) {
            fetchAndMessageList(roomIdSelected);
        }
    }, [chatting, roomIdSelected]);

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

    const subscribe = (roomId) => {
        client.current.subscribe(`/topic/chat/room/${roomId}`, (data) => {
            let line = JSON.parse(data.body);
            //setMessages([...messagesRef.current, line]);
            setChatting(line);
        });
    };

    // const unsubscribe = () => {
    //     client.current.unsubscribe();
    // }

    const publish = async (line) => {
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
        
        client.current.publish({
            destination: `/app/chat/message`,
            body: JSON.stringify({
                no: null,
                roomId: roomIdSelected,
                message: line,
                sender: localStorage.getItem("loginUserNo"),
                sendTime: `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${time.minutes}`,
                type: "message"
            }),
        });
    };


    return (
        <SiteLayout>
            <div className='col-xl-11 ml-4'>
                <div className="card mt-5">
                    <div className="card-body row" id="chat3" style={{ borderRadius: '15px' }}>
                        <ChatRoomList
                            callback={changeRoomIdSelected}
                            roomIdSelected={roomIdSelected}
                            roomList={roomList}
                            newRoomList={newRoomList}
                            setNewRoomList={setNewRoomList}
                            messages={messages}
                            notice={notice}
                            />
                        <ChatMessageList
                            messages={messages}
                            roomIdSelected={roomIdSelected}
                            publish={publish} />
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default Chat;