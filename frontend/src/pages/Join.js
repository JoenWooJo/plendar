import React, { useState } from 'react';
import axios from "axios";

import '../assets/scss/sb-admin-2.scss';
import { Link } from 'react-router-dom';

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

    const [checkEmail, setCheckEmail] = useState(false);

    let isKorEng = /^[가-힣a-zA-Z]+$/; // 이름: 한글이나 영문
    let isMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식
    let isEngNum = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/; // 비밀번호: 영문,숫자

    const regCheck = (regex, val) => {
        if (regex.test(val)) {
            return true;
        }
    }

    const doubleCheck = () => {
        if (email == '') {
            return alert('Email 입력해 주세요');
        }
        axios.post('api/user/check/email', {
            email: email
            }).then((resp) => {
                if (resp.data.data) {
                    setCheckEmail(true);
                    return alert("Email 사용 가능 합니다!");
                }
                setCheckEmail(false);
                return alert("중복된 Email 입니다. 다른 Email을 사용해주세요");

        }).catch((err) => {
            console.error(err);
        });
    };

    const joinClick = (event) => {

        if (name == "" || email == "" || password == "" || confirmpassword == "") {
            event.preventDefault();
            alert("빈칸을 입력해 주세요!");
            return;
        }

        else if (!regCheck(isKorEng, name)) {
            event.preventDefault();
            alert('이름은 한글 또는 영문으로 입력 해주세요');
            return;
        }

        else if (!regCheck(isMail, email)) {
            event.preventDefault();
            alert('Emaie 형식에 맞게 입력 해주세요');
            return;
        }

        else if (!regCheck(isEngNum, password)) {
            event.preventDefault();
            alert('비밀번호는 영문,숫자를 사용하여 6자 이상 입력 해주세요');
            return;
        }

        else if (!checkEmail) {
            event.preventDefault();
            alert('Email 중복체크 해주세요');
            return;
        }

        else if (password !== confirmpassword) {
            event.preventDefault();
            alert('비밀번호와 비밀번호 확인이 같아야 합니다!');
            setPassword("");
            setConfirmpassword("");
            return;
        }

        else {
            const data = {
                name: name,
                email: email,
                password: password,
                confirmpassword: confirmpassword,

            }
            axios.post('/api/user/join', data)
                .then((resp) => {
                }).catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block "><img src="assets/img/logo.png"></img></div>
                        <div className="col-lg-6">

                            <div className="p-5">

                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user">
                                    {/* 이름 입력 창 */}
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" value={name} onChange={onNameHandler} placeholder="Name..." required />
                                    </div>

                                    {/* 이메일 입력 창 */}
                                    <div className="form-group row">
                                        <input type="email" className=" col-sm-8 mb-3 ml-2 mb-sm-0 form-control form-control-user" value={email} onChange={onEmailHandler} placeholder="Email Address..." required />
                                        <button type="button" className=" col-sm-3 ml-2 btn btn-primary btn-user btn-block" value="submit" onClick={doubleCheck} >중복검사</button>
                                    </div>

                                    <div className="form-group row">
                                        {/* 비밀번호 입력 창 */}
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" pattern=".{6,}" className="form-control form-control-user" value={password} onChange={onPasswordHandler} placeholder="Password of 6 or more... " required />
                                        </div>
                                        {/* 콘필름 비밀번호 입력 창 */}
                                        <div className="col-sm-6">
                                            <input type="password" pattern=".{6,}" className="form-control form-control-user" value={confirmpassword} onChange={onConfirmpasswordHandler} placeholder="Confirm Password..." required />
                                        </div>
                                    </div>
                                    <Link to="/login">
                                        <button type="submit" className="btn btn-primary btn-user btn-block" value="submit" onClick={joinClick} >Register Account</button>
                                    </Link>
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