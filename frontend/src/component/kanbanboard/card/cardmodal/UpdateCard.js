import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';


const options = ['jjj@gmail.com', 'Ouuuu@naver.com'];

const UpdateCard = () => {

    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    return (
        <Form>
        <div className='row'>
            <div className='col-xl-6'>
                {/* 카드 제목 */}
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                    <Form.Label>카드 이름</Form.Label>
                    <Form.Control
                        type="title"
                        autoFocus
                    />
                </Form.Group>

                {/* 카드 내용 */}
                <Form.Group
                    className="mb-3 "
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>설명</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                {/* 시작일 */}
                <div className='ml-3 mb-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="시작일"
                            value={startDate}
                            inputFormat={"yyyy-MM-dd"}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                {/* 마감일 */}
                <div className='ml-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="마감일"
                            value={endDate}
                            inputFormat={"yyyy-MM-dd"}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>

            {/* 유저에게 카드권한 주기 */}
            <div className='col-xl-6 mt-4'>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="카드 권한" />}
                />
                <table className=" mt-3 table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                유댕이
                            </td>
                            <td>
                                {inputValue}
                            </td>
                            <td>
                                <CloseIcon />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Form>
    );
};

export default UpdateCard;