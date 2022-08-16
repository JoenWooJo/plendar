import React from 'react';
import {useState} from 'react'
import axios from "axios";

const Loginpage = () => {

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
        console.log(confirmpassword);

        axios.post('/api/user/login', body);
        if(password !== confirmpassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        let body = {
            email: email,
            password: password,
        }

      }
    //  Axios.post("/api/user/Join", body)액시오스를 이용하여 연결할때 이용
    //  .then(response => {})
    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width:'100%', height: '100vh'}}>
            <form  style={{display: 'flex', flexDirection:'column' }} 
                onSubmit={onSubmit}>

                Email : <input type="email" value={email} onChange={onEmailHandler} placeholder="Email Address..." required/>
                <p/>
                Password : <input type="password"  value={password} onChange={onPasswordHandler} placeholder="Password..." required/>
                <p/>
                ConfirmPassword : <input type="password"  value={confirmpassword} onChange={onConfirmpasswordHandler} placeholder="Password..." required/>
                <p/>

                <button type="submit" value="submit" >로그인</button>
            </form>
        </div>
    );
};

export default Loginpage;