import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import '../assets/scss/sb-admin-2.scss';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import HeaderDropdown from './HeaderDropdown';

const Header = ({ }) => {
    const current = decodeURI(window.location.pathname);
    
    const client = useRef({});
    const [alramList, _setAlramList] = useState([]);
    

    const [click, setClick] = useState(false);
    const [del, setDel] = useState(false); 
    const [chatCount, setCount] = useState(0);
    const [alramCount, _setAlramCount] = useState(0);

    const alramRef = useRef(alramList);

    const setAlramList = (alramList) => {
        alramRef.current = alramList;
        _setAlramList(alramList);
    }

    const alramCountRef = useRef(alramCount);

    const setAlramCount = (count) => {
        alramCountRef.current = count;
        _setAlramCount(count);
    }

    const logoutClick = async () => {
        await axios.get('/api/user/logout', {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        localStorage.removeItem("Authorization");
        localStorage.removeItem("loginUserNo");
        
        window.location.replace("/login");
    };

    const getAlramList = async () => {
        const resp = await axios.get("/api/notice/alramList", {
            params: {userNo: localStorage.getItem("loginUserNo")},
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        setAlramList(resp.data.data);
        setAlramCount((resp.data.data).length);
    };

    const getChatAlramCount = async () => {
        const resp = await axios.get("/api/notice/chat/count", {
            params: {
            userNo: localStorage.getItem("loginUserNo"),
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
        });
        setCount(resp.data.data);
    };

    useEffect(() => {
        connect();
    }, []);

    useEffect(()=>{
        getChatAlramCount();
    }, [current]);

    useEffect(()=>{
        getAlramList();
    }, [click]);


    const connect = async () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws/chat"),
            connectHeaders: {
                "auth-token": "spring-chat-auth-token",
            },
            debug: function (str) {
                // console.log("!!!!!!", str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                // console.log("!!!!!!!!!!!!!!!!!!!!!!연결??!");
                subscribe();
                // publish("알림확인 메세지 보내주");

            },
            onStompError: (frame) => {
                console.error(frame);
            }
        });

        await client.current.activate();
    };

    const subscribe = () => {
        client.current.subscribe(`/topic/notice/${localStorage.getItem("loginUserNo")}`, (data) => {
            let list = JSON.parse(data.body);
            setAlramList([list, ...alramRef.current]);
            setAlramCount(alramCountRef.current+1);
        }, { id: "notice-proj" });

        client.current.subscribe(`/topic/notice/chat/${localStorage.getItem("loginUserNo")}`, (data) => {
            let list = JSON.parse(data.body);
            console.log("count...?",list);
            setCount(list);
        }, { id: "notice-chat" });
    };


    return (
        <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow col-xl-12">


            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for…"
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <SearchIcon />
                        </button>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow mx-1">
                    <Link to="/chat" className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Badge color="error" badgeContent={current == "/chat" ? 0 : chatCount == 0 ? 0 : " "} variant="dot">
                            <ChatIcon color="primary" fontSize="large" />
                        </Badge>
                    </Link>
                </li>

                <li className="nav-item dropdown no-arrow mx-1 ">
                    <div className="nav-link dropdown-toggle" href="#" role="button" id="alertsDropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" >
                        <Badge color="error" badgeContent={alramCount}>
                            <AccessAlarmIcon color="primary" fontSize="large" onClick={e => { setClick(click => !click) }} />
                        </Badge>
                        {click ? <HeaderDropdown alramList={alramList} setClick={setClick} setDel={setDel}/> : null}
                    </div>

                </li>
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item logout botton">
                    <Link className="nav-link " to="/login" id="usrlogout" role="button"
                        data-toggle="botton" aria-haspopup="true" aria-expanded="false" onClick={logoutClick} >
                        <b className="d-lg-inline text-gray-600 mr-3">logout</b>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;