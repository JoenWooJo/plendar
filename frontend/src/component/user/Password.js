import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';


const Password = () => {
    
    return (
            <div className="col-xl-11 ml-5" style={{ height: "900px", overflow: "auto" }} >
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h4 className="m-0 font-weight-bold text-primary"><LockIcon fontSize='large'/> &nbsp;비밀번호 변경</h4>
                    </div>
                    <div className="card-body" style={{ height: "680px"}} >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                            <div align="center" className='mt-5'>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 변경</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password new"
                                            // type={newValues.showPassword ? 'text' : 'password'}
                                            // value={newValues.password}
                                            // onChange={newHandleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={newHandleClickShowPassword}
                                                        // onMouseDown={newHandleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {/* {newValues.showPassword ? <VisibilityOff /> : <Visibility />} */}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="비밀번호변경"
                                        />
                                    </FormControl>
                                    
                                    <br/>

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password confirm"
                                            // type={confirmValues.showPassword ? 'text' : 'password'}
                                            // value={confirmValues.password}
                                            // onChange={confirmHandleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={confirmHandleClickShowPassword}
                                                        // onMouseDown={confirmHandleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {/* {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />} */}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="비밀번호 확인"

                                        />
                                    </FormControl>
                            </div>                           
                        </Box>
                        <center >
                         <Button className='mt-5' variant="contained"  type="submit" size="large" >확인하기</Button>
                        </center>
                    </div>
                </div>
            </div>
    );
};

export default Password;