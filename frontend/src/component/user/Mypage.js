import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

import SiteLayout from '../../layout/SiteLayout';

const client = axios.create({ baseURL: '/api' })

const updateUser = async (data) => {
    let response = await client.post('/user/axios/update', data)
    let li = response.data.data;
    console.log("!!!!", response.data.data);

    return response.data.data;
}

const updateprofile = async () => {
    let response = await client.post('/user/axios/updateProfile')
    let li = response.data.data;
    console.log("!!!!", response.data.data);

    return response.data.data;
}

const mypage = () => {

    const [name, setName] = React.useState('전우조');
    const [email, setEmail] = React.useState('jyj6010@gmail.com');
    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeEmail = (event) => {
        setEmail(event.target.value);
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
    //=====================================================================
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(values);
        console.log(newvalues);
        console.log(confirmvalues);
        if (newvalues.password !== confirmvalues.password) {
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        else {
            let body = {
                name: name,
                email: email,
                password: newvalues.password
            }

            updateUser(body);
        }
    }

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
                <div className="card shadow">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body" >

                        <div className='row ml-5'>
                            <div className='col-xl-3 mt-5'>
                                <img src="/img/exprofile.png" style={{ width: '200px' }}></img>
                                <div className='row'>
                                    <Button className='mt-2 ml-5 mr-1' variant="outlined" component="label">
                                        Upload
                                        <input hidden accept="image/*" multiple type="file" />
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
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">현재 비밀번호</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password current"
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

                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">비밀번호 변경</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password new"
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

                                                id="outlined-adornment-password confirm"
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