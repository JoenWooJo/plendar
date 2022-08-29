import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import '../assets/scss/sb-admin-2.scss';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import HeaderDropdown from './HeaderDropdown';

const Header = ({ }) => {
    const client = useRef({});
    const [alramList, setAlramList] = useState([]);
    const [click, setClick] = useState(false);
    const [chatCount, setCount] = useState(0);
    const [alramCount, setAlramCount] = useState(0);

    const logoutClick = async () => {
        await axios.get('/api/user/logout')

        localStorage.removeItem("loginUserNo");
        localStorage.removeItem("loginUserEmail");
        localStorage.removeItem("loginUserName");
        localStorage.removeItem("loginUserProfile");

        window.location.replace("/login");

    };

    const getAlramList = async () => {
        const resp = await axios.get("/api/notice/alramList");
        setAlramList(resp.data.data);
        // console.log(">>>>>>>><<<<<",(resp.data.data).length)
        setAlramCount((resp.data.data).length);
    };

    useEffect(()=>{
        connect();  
    }, []);

    useEffect(()=>{
        getAlramList();
    }, [alramList, alramCount])

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
                subscribe();
                // publish("알림확인 메세지 보내주");

            },
            onStompError: (frame) => {
                console.error(frame);
            }
        });

        client.current.activate();
    };

    const subscribe = () => {
        client.current.subscribe(`/topic/notice`, (data) => {
            let list = JSON.parse(data.body);
            setAlramList([...alramList, list]);
            //setMessages([...messagesRef.current, line]);
            // setChatting(line);
        }, { id: "notice" });
    };

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
            destination: `/app/notice/message`,
            body: JSON.stringify({
                no: null,
                message: line,
                type: "notice",
                projectNo: 1,
                userNo: localStorage.getItem("loginUserNo"),
                time: `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${time.minutes}`,
                
            }),
        });
    };

    return (
        <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">

            <div className="input-group rounded col-xl-3">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <SearchIcon />
                </span>
            </div>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link to="/chat" className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Badge color="error" badgeContent={chatCount}>
                            <MessageRoundedIcon />
                        </Badge>
                    </Link>
                </li>

                <li className="nav-item dropdown no-arrow mx-1 ">
                    <div className="nav-link dropdown-toggle" href="#" role="button" id="alertsDropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" >
                        <Badge color="error" badgeContent={alramCount}>
                            <AccessAlarmIcon onClick={e => { setClick(click => !click) }} />
                        </Badge>
                        {click ? <HeaderDropdown alramList={alramList} /> : null}
                    </div>

                </li>
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item logout botton">
                    <Link className="nav-link " to="/login" id="usrlogout" role="button"
                        data-toggle="botton" aria-haspopup="true" aria-expanded="false" onClick={logoutClick} >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;