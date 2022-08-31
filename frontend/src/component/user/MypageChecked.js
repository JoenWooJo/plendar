import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SiteLayout from '../../layout/SiteLayout';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';


const MypageChecked = () => {
    const [password, setPassword] = useState("");
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

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


    const passwordCheck = (event) => {
        let body = {
            no: localStorage.getItem("loginUserNo"),
            password: password,
        }

        axios.post('/api/user/confirmPassword', body)
            .then((resp) => {
                const result = resp.data.data;
                if (resp.data.result == "fail") {
                    alert(resp.data.message);
                    window.location.replace("/login");
                }
                else if (result == false) {
                    // 비밀번호가 틀렸을 때
                    alert("입력하신 비밀번호가 틀렸습니다.")
                    return;
                } else {
                    window.location.replace("/user/mypage");
                }

            });
    }

    const keyEnter = (e) => {
        if (e.key === "Enter") {
            console.log("엔터!!!!");
            passwordCheck();
        }
    };


    return (
        <SiteLayout>
            <div className="col-xl-11 ml-5" style={{ height: "900px", overflow: "auto" }} >
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h4 className="m-0 font-weight-bold text-primary"><LockIcon fontSize='large'/> &nbsp;비밀번호 확인</h4>
                    </div>
                    <div className="card-body" style={{ height: "680px"}} >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                            <div align="center" >
                                <h1>회원 비밀번호 확인</h1><hr />
                                <p />
                                <div className="mt-5">
                                    <b>회원님의 정보를 안전한 보호를 위해<br /> 비밀번호를 한번 더 확인합니다.  </b>
                                </div>
                            </div>
                            <p />
                            <div align="center">
                                <p />
                                {/* <h3 style={{ color: "#6667af" }}>Email : {localStorage.getItem("loginUserEmail")}</h3> */}
                            </div>
                            <div align="center">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">현재 비밀번호</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={password}
                                        onKeyPress={keyEnter}
                                        onChange={onPasswordHandler}
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
                <Button variant="contained"  type="submit" size="large" onClick={passwordCheck} >확인하기</Button>
                        </center>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default MypageChecked;