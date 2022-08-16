import React from 'react';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'react-router-dom';
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

const mypage = () => {

    const [name, setName] = React.useState('전우조');
    const [email, setEmail] = React.useState('jyj6010@gmail.com');

    //비밀번호 객체 따로 다 만들기
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


    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
                <div className="card shadow">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">회원정보 수정</h6>
                    </div>
                    <div className="card-body">

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


                            <div className='col-xl-8'>
                                <Box
                                    component="form"
                                    sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', mt: 3 }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="name"
                                            multiline
                                            maxRows={4}
                                            value={name}
                                            onChange={changeName}
                                            sx={{ ml: 1 }}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="email"
                                            multiline
                                            maxRows={5}
                                            value={email}
                                            onChange={changeEmail}
                                            sx={{ ml: 3 }}
                                        />
                                    </div>
                                </Box>
                                <hr />
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
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

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 변경</InputLabel>
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
                                            label="비밀번호변경"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
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
                                            label="비밀번호 확인"
                                        />
                                    </FormControl>
                                </Box>
                            </div>
                        </div>

                        <center>
                            <Link to="#" style={{ textDecoration: "none" }}>
                                <button type="button" className=" mt-3 mr-2 btn btn-secondary">수정하기</button>
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