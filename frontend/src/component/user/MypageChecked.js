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
    // var x = localStorage.getItem(""); 로컬가져와서 하려했는데 로컬엔 비번없음
    //=====================================================================
    const onSubmit = (event) => {
        console.log(name);
        console.log(email);
        console.log(values);

        // if (newvalues.password !== ) {
        //     return alert("비밀번호와 비밀번호 확인이 같아야 합니다.")
        // }
        // else {
        //     let body = {
        //         values: values.password,
        //     }

        //     axios.post('http://localhost:8080/api/user/updateUser', body)
        //         .then((resp) => {
        //             console.log(resp);
        //         })
        // }
    }

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body" >

                                
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                   <div className="m: 1, width: 25ch" align="center" sx={{  }}   > 
                                            <h3 style={{ color: "#6667ab" }}>회원비밀번호 확인</h3><hr/>
                                            <b style={{ color: "#6667ab" }}>비밀번호를 한번 더 입력해주세요.</b>
                                            <div className="ml-0">
                                                <p style={{ color: "#6667af" }}>회원님의 정보를 안전하게 보호하기 위해<br/> 비밀번호를 한번 더 확인합니다.             </p>
                                            </div>
                                    </div>
                                    <p/>
                                    <div align="center">
                                        <p/>
                                        <h6 style={{ color: "#6667af" }}>회원 아이디 : {email}</h6>
                                    </div>
                                    <div align="center">

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel   htmlFor="outlined-adornment-password">현재 비밀번호</InputLabel>
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
                                    </div>    

                                    <div className="mt-4" style={{ opacity: "0" }} ><CheckCircleIcon /></div>
                                </Box>


                        <center >
                            <Link to="/user/mypage" style={{ textDecoration: "none" }} >
                                <button type="submit" className=" mt-3 mr-2 btn btn-secondary" values="onsubmit" onClick={onSubmit}>확인하기</button>
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