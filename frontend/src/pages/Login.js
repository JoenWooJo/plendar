import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import {useRef, useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { set } from 'date-fns';

const Login = () => {
    const [email, setEmail] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }


    const loginClick = (event) => {
        event.preventDefault(); 
        let data = {
            email: email,
            password: password,
        }
        axios.post('http://localhost:8080/api/user/login', body )

            .then((resp)=>{
                const result = resp.data.data;
                if (result == null) {
                    // 로그인 실패 했을 때
                    event.preventDefault(); 
                    alert("아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.")
                    return;
                }
                localStorage.setItem('loginUserNo', result["no"]);
                localStorage.setItem('loginUserEmail', result["email"]);
                localStorage.setItem('loginUserName', result["name"]);

                console.log("loginUserNo: ",localStorage.getItem("loginUserNo"));
                window.location.replace("/");
            });
        
    }


    return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-7 d-none d-lg-block"><img src="img/logo.png"></img></div>
                                    <div className="col-lg-5">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h1 text-gray-900 mb-4">Login</h1>
                                            </div>
                                            <form className= "user" >
                                                {/* 이메일 입력 창 */}
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" value={email} onChange={onEmailHandler} placeholder="Email Address..." required />
                                                </div>
                                                
                                                 {/* 비밀번호 입력 창 */}
                                                <div className="form-group">
                                                    <input type="password" pattern=".{6,}" className="form-control form-control-user" value={password} onChange={onPasswordHandler} placeholder="Password..." required/>
                                                </div>
                                                
                                                <button type="submit" className="btn btn-primary btn-user btn-block" value="submit" onClick={loginClick} >Login</button>

                                            </form>
                                            <hr />

                                            <div className="text-center">
                                                <a className="small" href="/forgotpw">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="/join">Create an Account!</a>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    );
};

export default Login;