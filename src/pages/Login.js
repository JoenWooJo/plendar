import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import {useRef, useState, useEffect} from 'react';
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])
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
                                            <form onSubmit = {event => {
                                                setEmail = event.target.email.value;
                                                
                                            }}>
                                                {/* 이메일 입력 창 */}
                                                <div className="form-group">
                                                    <form>
                                                        <input 
                                                            type = "text"
                                                            className="form-control email"
                                                            id = "email"
                                                            ref = {emailRef}
                                                            autoComplete = "on"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                            placeholder="Enter Email Address..."
                                                            required />
                                                    </form>
                                                </div>
                                                 {/* 비밀번호 입력 창 */}
                                                <div className="form-group">
                                                    <form>
                                                        <input 
                                                            type = "Password"
                                                            className="form-control email"
                                                            ref = {passwordRef}
                                                            autoComplete = "off"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            value={password}
                                                            placeholder="Password..."
                                                            required />
                                                    </form>
                                                </div>
                                                <a onClick={()=>{ 
                                                    console.log(email);
                                                    console.log(password);
                                                    }} className="btn btn-primary btn-user btn-block">Login</a>
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