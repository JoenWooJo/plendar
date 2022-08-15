import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import {useRef, useState, useEffect} from 'react';

const ForgetPassword = () => {
    const emailRef = useRef();
    const [email, setEmail]= useState('');
    return (
        <div className="container">
        <div className="row justify-content-center">
        {/* <!-- Outer Row --> */}

            <div className="col--10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block"><img src="img/logo.png"></img></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-">Forgot Your Password?</h1>
                                        <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                    <form className="user">
                                        {/* 이메일 입력 창 */}
                                    <div className="form-group">
                                        <form>
                                            <input
                                                type="text"
                                                className="form-control email"
                                                id="email"
                                                ref={emailRef}
                                                autoComplete="on"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                placeholder="Enter Email Address..."
                                                required />
                                        </form>
                                    </div>

                                        <a href="/login" className="btn btn-primary btn-user btn-block">
                                            Reset Password
                                        </a>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <a className="small" href="/join">Create an Account!</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="/login">Already have an account? Login!</a>
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

export default ForgetPassword;