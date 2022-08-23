import React, { useState } from 'react';
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
import SiteLayout from '../../layout/SiteLayout';

const mypage = () => {
    const [name, setName] = React.useState('전우조');
    const [email, setEmail] = React.useState('jyj6010@gmail.com');
    const [profile, setProfile] = useState({ changeProfile });
    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeProfile = (event) => {
        setProfile(event.target.value);
    };

    //비밀번호 =============================================================
    const [values, setValues] = React.useState({
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
    const [newvalues, setNewValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const newHandleChange = (prop) => (event) => {
        setNewValues({ ...newvalues, [prop]: event.target.value });
    };

    const newHandleClickShowPassword = () => {
        setNewValues({
            ...newvalues,
            showPassword: !newvalues.showPassword,
        });
    };

    const newHandleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // confirm확인비밀번호
    const [confirmvalues, setConfirmValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const confirmHandleChange = (prop) => (event) => {
        setConfirmValues({ ...confirmvalues, [prop]: event.target.value });
    };

    const confirmHandleClickShowPassword = () => {
        setConfirmValues({
            ...confirmvalues,
            showPassword: !confirmvalues.showPassword,
        });
    };

    const confirmHandleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // var x = localStorage.getItem(""); 로컬가져와서 하려했는데 로컬엔 비번없음
    //=====================================================================
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(profile);
        console.log(name);
        console.log(email);
        console.log(values);
        console.log(newvalues);
        console.log(confirmvalues);

        if (newvalues.password !== confirmvalues.password) {
            return alert("비밀번호와 비밀번호 확인이 같아야 합니다.")
        }
        else {
            let body = {
                email: email,
                name: name,
                password: newvalues,
                profile: profile,
            }

            axios.post('http://localhost:8080/api/user/updateUser', body)
                .then((resp) => {
                    console.log(resp);
                })
        }
    }

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body" >

                        <div className='row ml-5'>
                            <div className='col-xl-3 mt-5'>
                                <img src="/img/exprofile.png" style={{ width: '200px' }}></img>
                                <div className='row'>

                                    <Button className='mt-2 ml-5 mr-1' variant="outlined" component="label" onChange={changeProfile}>
                                        Upload<input hidden accept="image/*" multiple type="file" />

                                    </Button>
                                    <Button className='mt-2 mr-2' variant="outlined">
                                        삭제
                                    </Button>
                                </div>
                            </div>


                            <div className='col-xl-8' >
                                <Box
                                    component="form"
                                    sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', mt: 3 }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div >
                                        <TextField
                                            id="outlined-multiline-flexible"
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
                                            id="outlined-multiline-flexible"
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
                                                id="outlined-adornment-password"
                                                type={newvalues.showPassword ? 'text' : 'password'}
                                                value={newvalues.password}
                                                onChange={newHandleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={newHandleClickShowPassword}
                                                            onMouseDown={newHandleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {newvalues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="비밀번호변경"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
                                            <OutlinedInput

                                                id="outlined-adornment-password"
                                                type={confirmvalues.showPassword ? 'text' : 'password'}
                                                value={confirmvalues.password}
                                                onChange={confirmHandleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={confirmHandleClickShowPassword}
                                                            onMouseDown={confirmHandleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {confirmvalues.showPassword ? <VisibilityOff /> : <Visibility />}
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
                                <button type="submit" className=" mt-3 mr-2 btn btn-secondary" values="onsubmit" onClick={onSubmit}>수정하기</button>
                            </Link>
                            <Link to="#" style={{ textDecoration: "none" }}>
                                <button type="button" className=" mt-3 btn btn-secondary">취소</button>
                            </Link>
                        </center>

                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default mypage;