import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    
    const loginClick = async (event) => {
        event.preventDefault(); 
        let data = {
            email: email,
            password: password,
        }
        
        await axios.post('/api/login', data)
            .then((resp)=>{
                const result = JSON.parse(resp.config.data);
                const accesToken = resp.headers.authorization;

                localStorage.setItem('Authorization', accesToken);
                const decode = jwt_decode(accesToken);
                localStorage.setItem('loginUserNo', decode["no"]);
            }).catch(error => {
                alert("로그인 정보가 시스템에 있는 계정과 일치하지 않습니다.");
            });

        await axios.get('/api/user/findByUserNo', {
            params: {
                userNo: localStorage.getItem("loginUserNo"),
            },
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            }).then((resp) => {
                const result = resp.data.data;
                if (result["projectCount"] >= 1) {
                    window.location.replace("/project/myproject");
                }
                else {
                    window.location.replace("/component");
                }
            })
        
    }


    return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-7 d-none d-lg-block"><img src="/img/logo.png"></img></div>
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