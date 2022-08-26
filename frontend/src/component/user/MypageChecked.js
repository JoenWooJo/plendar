import React, { useState } from 'react';
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
import SiteLayoutNS from '../../layout/SiteLayoutNS';

const mypage = () => {

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
            password: password,
        }

        axios.post('/api/user/confirmPassword', body)
            .then((resp) => {
                const result = resp.data.data;
                if (result == true) {
                    // 비밀번호가 틀렸을 때
                    alert("입력하신 비밀번호가 틀렸습니다.")
                    return;
                }
                window.location.replace("/user/mypage");
            });
    }

    const keyEnter = (e) => {
        if (e.key === "Enter") {
            console.log("엔터!!!!");
            passwordCheck();
        }
    };


    return (
        <SiteLayoutNS>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body" >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                            <div className="m: 1, width: 25ch" align="center" sx={{}}   >
                                <h3 style={{ color: "#6667ab" }}>회원 비밀번호 확인</h3><hr />
                                <b style={{ color: "#6667ab" }}>비밀번호를 입력해주세요.</b>
                                <p />
                                <div className="ml-0">
                                    <p className="text-xs font-weight-bold text-gray text-uppercase" style={{ color: "#6667af" }}>회원님의 정보를 안전한 보호를 위해<br /> 비밀번호를 한번 더 확인합니다.             </p>
                                </div>
                            </div>
                            <p />
                            <div align="center">
                                <p />
                                <h6 style={{ color: "#6667af" }}>Email : {localStorage.getItem("loginUserEmail")}</h6>
                            </div>
                            <div align="center">
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                            <Link to="/user/mypage" style={{ textDecoration: "none" }} >
                                <button 
                                    type="submit" 
                                    className=" mt-3 mr-2 btn btn-secondary" 
                                    values="onsubmit" 
                                    onClick={passwordCheck}
                                    >
                                    확인하기
                                </button>
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