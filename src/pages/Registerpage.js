import React from 'react';
import {useState} from 'react'
import axios from "axios";

const Registerpage = () => {

    const [email, setEmail] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const [name, setName] = useState("");
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const [confirmpassword, setConfirmpassword] = useState("");
    const onConfirmpasswordHandler = (event) => {
        setConfirmpassword(event.currentTarget.value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmpassword);

        const data = await axios.get('/api/axios/test');
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!", data)

        if(password !== confirmpassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        
        let body = {
            email: email,
            password: password,
            name: name,
            confirmpassword: confirmpassword
        }

      }
    //   Axios.post("/api/user/Join", body)액시오스를 이용하여 연결할때 이용
    //  .then(response => {})

    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width:'100%', height: '100vh'}}>
            <form  style={{display: 'flex', flexDirection:'column' }} 
                onSubmit={onSubmit}>
                Name : <input type="text" value={name} onChange={onNameHandler} placeholder="Name..." required/>
                <p/>
                Email : <input type="email" value={email} onChange={onEmailHandler} placeholder="Email Address..." required/>
                <p/>
                Password : <input type="password"  value={password} onChange={onPasswordHandler} placeholder="Password..." required/>
                <p/>
                비밀번호 확인 : <input type="password" value={confirmpassword} onChange={onConfirmpasswordHandler} placeholder="Passwrod...재확인" required/>
                <p/>
                <button type="submit" value="submit" >회원가입</button>
            </form>
        </div>
    );
};

export default Registerpage;