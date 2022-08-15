import React from 'react';
import '../assets/scss/sb-admin-2.scss';
import { useRef, useState, useEffect } from 'react';

const Join = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatpasswordRef = useRef();


    const [repeatpassword, setRepeatpassword] = useState('');

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
        console.log(email);
        console.log(password);

        axios.post('/api/user/login', body);
        if(password !== confirmpassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        let body = {
            email: email,
            password: password,
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
                                <form className="user">
                                    {/* 이름 입력 창 */}
                                    <div className="form-group">
                                        <form>
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                ref={nameRef}
                                                id="name"
                                                autoComplete="off"
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                placeholder="Name..."
                                                required />
                                        </form>
                                    </div>
                                    {console.log(name)}

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

                                    <div className="form-group row">
                                        {/* 비밀번호 입력 창 */}
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <form>
                                                <input
                                                    type="Password"
                                                    className="form-control form-control-user"
                                                    ref={passwordRef}
                                                    id="Password"
                                                    autoComplete="off"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    placeholder="Password..."
                                                    required />
                                            </form>
                                        </div>
                                        {/* 리피트 비밀번호 입력 창 */}
                                        <div className="col-sm-6">
                                            <form>
                                                <input
                                                    type="Password"
                                                    className="form-control form-control-user"
                                                    ref={passwordRef}
                                                    id="RepeatPassword"
                                                    autoComplete="off"
                                                    onChange={(e) => setRepeatpassword(e.target.value)}
                                                    value={repeatpassword}
                                                    placeholder="Repeat Password..."
                                                    required />
                                            </form>
                                        </div>
                                    </div>
                                    <a href="/login" className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </a>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <a className="small" href="/forgotpw">Forgot Password?</a>
                                </div>
                                <div className="text-center">
                                    <a className="small" href="/login">Already have an account? Login!</a>
                                </div>

                                <a href="/login" className="btn btn-primary btn-user btn-block">
                                    Register Account
                                </a>
                            </div>
                            <hr/>
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
    );
};
export default Join;

