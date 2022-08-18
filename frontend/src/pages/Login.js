import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import {useRef, useState, useEffect} from 'react';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault(); // 성공시 페이지 이동해야함 
        console.log(email);
        console.log(password);
        let body = {
            email: email,
            password: password,
        }
        axios.post('http://localhost:8081/api/user/login', body )
            .then((resp)=>{
                console.log(resp);
            })
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
                                            <form className= "user" onSubmit = {onSubmit} >
                                                {/* 이메일 입력 창 */}
                                                <div className="form-group">
                                                    <form>
                                                        <input type="email" className="form-control form-control-user" value={email} onChange={onEmailHandler} placeholder="Email Address..." required />
                                                    </form>
                                                </div>
                                                
                                                 {/* 비밀번호 입력 창 */}
                                                <div className="form-group">
                                                    <form>
                                                        <input type="password" pattern=".{6,}" className="form-control form-control-user" value={password} onChange={onPasswordHandler} placeholder="Password..." required/>
                                                    </form>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block" value="submit" >Login</button>

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