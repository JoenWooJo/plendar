import React, { useState } from 'react';
import axios from "axios";

import '../assets/scss/sb-admin-2.scss';

const Join = () => {
    const [name, setName] = useState("");
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const [email, setEmail] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const [confirmpassword, setConfirmpassword] = useState("");
    const onConfirmpasswordHandler = (event) => {
        setConfirmpassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmpassword);
        if(password !== confirmpassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        else{
        let body = {
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword,

        }
        axios.post('http://localhost:8080/api/user/join', body );
        }
    }

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block "><img src="img/logo.png"></img></div>
                        <div className="col-lg-6">

                            <div className="p-5">

                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={onSubmit}>
                                    {/* 이름 입력 창 */}
                                    <div className="form-group">
                                            <input type="text" className="form-control form-control-user" value={name} onChange={onNameHandler} placeholder="Name..." required/>
                                    </div>

                                    {/* 이메일 입력 창 */}
                                    <div className="form-group">
                                            <input type="email" className="form-control form-control-user" value={email} onChange={onEmailHandler} placeholder="Email Address..." required/>
                                    </div>

                                    <div className="form-group row">
                                        {/* 비밀번호 입력 창 */}
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" pattern=".{6,}" className="form-control form-control-user" value={password} onChange={onPasswordHandler} placeholder="Password..." required/>
                                        </div>
                                        {/* 콘필름 비밀번호 입력 창 */}
                                        <div className="col-sm-6">
                                            <input type="password" pattern=".{6,}" className="form-control form-control-user" value={confirmpassword} onChange={onConfirmpasswordHandler} placeholder="ConfirmPassword..." required/>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-user btn-block" value="submit" >Register Account</button>

                                </form>
                                <hr />

                                <div className="text-center">
                                    <a className="small" href="/forgotpw">Forgot Password?</a>
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
    );
};
export default Join;
