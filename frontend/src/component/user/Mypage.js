import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SiteLayoutNS from '../../layout/SiteLayoutNS';

const mypage = () => {
    const client = axios.create({ baseURL: '/api' })

    const [name, setName] = useState(localStorage.getItem("loginUserName"));
    const [email, setEmail] = useState(localStorage.getItem("loginUserEmail"));
    const [profile, setProfile] = useState(localStorage.getItem("loginUserProfile"))

    const changeName = (event) => {
        setName(event.target.value);
    };

    //비밀번호 =============================================================
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //new변경비밀번호
    const [newValues, setNewValues] = useState({
        password: '',
        showPassword: false,
    });

    const newHandleChange = (prop) => (event) => {
        setNewValues({ ...newValues, [prop]: event.target.value });
    };

    const newHandleClickShowPassword = () => {
        setNewValues({
            ...newValues,
            showPassword: !newValues.showPassword,
        });
    };

    const newHandleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // confirm확인비밀번호
    const [confirmValues, setConfirmValues] = useState({
        password: '',
        showPassword: false,
    });

    const confirmHandleChange = (prop) => (event) => {
        setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };

    const confirmHandleClickShowPassword = () => {
        setConfirmValues({
            ...confirmValues,
            showPassword: !confirmValues.showPassword,
        });
    };
    const confirmHandleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //=====================================================================
    const onSubmitU = (event) => {
        event.preventDefault();
        if (newValues.password !== confirmValues.password) {
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        else {
            let body = {
                no: localStorage.getItem("loginUserNo"),
                name: name,
                email: email,
                password: newValues.password
            }

            axios.post('/api/user/updateUser', body)
                .then((resp) => {
                    console.log(resp);
                })
        }
    }

    const refForm = useRef(null);
    
    const handleSubmit = async function(e) {
        e.preventDefault();

        console.log(e.target['file'].files[0]);

    
        if (e.target['file'].files.length === 0) {
            console.error(`validation ${e.target['file'].placeholder} is empty`);
            return;
        }

        const file = e.target['file'].files[0];

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);

        // Post
        const response = await client.post(`/user/axios/updateProfile`, formData ,{
            headers: { 
                'Accept': 'application/json'
            }
        });

        // 바뀐 url
        console.log(response.data.data);
        setProfile(response.data.data);
        localStorage.setItem("loginUserProfile", response.data.data)

    }

    return (
        <SiteLayoutNS>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body" >
                        <div className='row ml-5'>
                            <form
                                onSubmit={handleSubmit} 
                                ref={refForm}>
                                <div className='col-xl-3 mt-5'>
                                    <img id="profile" src= {profile} style={{ width: '200px' }}></img>
                                    <div className='row' >
                                    <input
                                        type={'file'}
                                        name={'file'}
                                        placeholder={'이미지(사진)'}/>
                            <Button className='mt-2 mr-2' variant="outlined" onClick={() => {
                                refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                            }}>
                                올리기
                            </Button>
                            <Button className='mt-2 mr-2' variant="outlined" >
                                삭제
                            </Button>
                                    </div>
                                        
                                </div>
                            </form>

                            <div className='col-xl-8' >
                                <Box
                                    component="form"
                                    sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', mt: 3 }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div >
                                        <TextField
                                            id="outlined-multiline-flexible name"
                                            label="name"
                                            multiline
                                            maxRows={4}
                                            sx={{ ml: 1 }}

                                            value={name}
                                            onChange={changeName}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            id="outlined-multiline-flexible email"
                                            label="email"
                                            multiline
                                            maxRows={5}
                                            sx={{ ml: 3 }}
                                            value={email}
                                            disabled
                                        />
                                    </div>
                                </Box >
                                <hr />

                                <form >

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>

                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">현재 비밀번호</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"

                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}

                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="현재 비밀번호"
                                            />
                                        </FormControl>

                                        <div className="mt-4" style={{ opacity: "0" }} ><CheckCircleIcon /></div>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">비밀번호 변경</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password new"
                                                type={newValues.showPassword ? 'text' : 'password'}
                                                value={newValues.password}
                                                onChange={newHandleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={newHandleClickShowPassword}
                                                            onMouseDown={newHandleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {newValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="비밀번호변경"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password confirm"
                                                type={confirmValues.showPassword ? 'text' : 'password'}
                                                value={confirmValues.password}
                                                onChange={confirmHandleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={confirmHandleClickShowPassword}
                                                            onMouseDown={confirmHandleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="비밀번호 확인"

                                            />
                                        </FormControl>
                                    </Box>
                                </form>
                            </div>
                        </div>

                        <center >
                            <Link to="#" style={{ textDecoration: "none" }} >
                                <button type="submit" className=" mt-3 mr-2 btn btn-secondary" values="onsubmit" onClick={onSubmitU}>수정하기</button>
                            </Link>
                            <Link to="#" style={{ textDecoration: "none" }}>
                                <button type="button" className=" mt-3 btn btn-secondary">취소</button>
                            </Link>
                        </center>

                    </div>
                </div>
            </div>
        </SiteLayoutNS>
    );
};

export default mypage;



//# sourceURL=mypage.js