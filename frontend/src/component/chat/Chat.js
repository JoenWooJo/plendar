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
    
    const [noticeSelected, setNoticeSelected] = useState();
    const [first, setFirst] = useState(true);
    const [sub, setSub] = useState(null);

    const changeRoomIdSelected = (id) => {
        setRoomIdSelected(id);
    };

    const fetchAndSetRooms = async () => {
        connect();
        const resp = await axios.get('/api/chat/rooms');
        const rooms = resp.data.data;
        first && setSub(rooms);
        if (resp.data.result == "fail") {
            alert(resp.data.message);
            window.location.replace("/login");
        }

        setNewRoomList(resp.data.data);
        setRoomList(resp.data.data);
    }

    useEffect(() => {
        
        fetchAndSetRooms();

        // return () => {
        //     disconnect();
        // };
    }, [messages, noticeSelected]);

    useEffect(()=>{
        console.log("ttt ",sub === null);
        sub !== null && sub.map((e) => {
            subscribe(e.no);
            setFirst(false);
        });
    }, [sub])


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
    }, [roomIdSelected]);

    const connect = async () => {
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

        await client.current.activate();
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const subscribe = (roomId) => {
        client.current.subscribe(`/topic/chat/room/${roomId}`, (data) => {
            let line = JSON.parse(data.body);
            console.log(line);
            setMessages([...messagesRef.current, line]);
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
        <div className="col-xl-11 ml-4">
            <div className="card-header py-3">
                <h4 className="m-0 font-weight-bold text-primary">chatting</h4>
            </div>
            <div className="card-body" style={{ height: "680px", overflow: "auto" }} >
                <div className="card-body row" id="chat3" style={{ borderRadius: '15px' }}>
                    <ChatRoomList
                        callback={changeRoomIdSelected}
                        roomIdSelected={roomIdSelected}
                        roomList={roomList}
                        newRoomList={newRoomList}
                        setNewRoomList={setNewRoomList}
                        messages={messages}
                        setNoticeSelected={setNoticeSelected}
                    />
                    <ChatMessageList
                        messages={messages}
                        roomIdSelected={roomIdSelected}
                        publish={publish} />
                </div>
            </div>
        </div>
    );
};

export default Chat;