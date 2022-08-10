import React from 'react';
import SiteLayout from '../../layout/SiteLayout';
import {TextField,Typography,Rating,Autocomplete} from "@mui/material";
import { Link } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const CreateProject = () => {
    const [title, setTitle] = React.useState();
    const [description, setDescription]= React.useState('');
    const [priority, setPriority] = React.useState(2);
    const [startDate, setSartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


    const Member = [
        { name: '정유진', email: 'jyj6010@gmail.com' },
        { name: '이윤호', email: '2yh@naver.com' },
        { name: '김채원', email: 'coco@naver.com' },
        { name: '곽도훈', email: 'kkack@naver.com' },
        { name: '김현석', email: 'khs@naver.com' },
        { name: "김윤호", email: '1yh@naver.com' }
    ]

    return (
        
        <div>
            <SiteLayout>
            <h1 className="h3 ml-3 text-gray-800">create new project</h1><br/>

            <div className="col-xl-12">
           
            <div className="row">
            <div className="card shadow ml-5 mt-3 col-xl-6">
                <div className="card-header1 py-3">
                    <h6 className="m-0 font-weight-bold text-light">project</h6>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                    <div className='row'>
                    <div className='col-xl-6'>
                    <Typography component="legend"> 프로젝트 제목</Typography>
                    <TextField id="standard-basic" variant="standard" />
                    </div>

                    <div className='col-xl-5'>
                    <Typography component="legend"> 프로젝트 중요도</Typography>
                    <Rating
                    name="simple-controlled"
                    value={priority}
                    onChange={(event, priority) => {
                        setPriority(priority);
                        console.log(priority);
                    }}
                    /> 
                    </div>
                  
                    <div className='row'>
                    <div className='mt-3 ml-2 col-xl-5'>
                    <div className="form-group">
                     <label className="exampleFormControlTextarea3">내용</label>
                    <textarea className="form-control" id="exampleFormControlTextarea3" rows="7"></textarea>
                    </div>
                    </div>

                    <div className='mt-5 ml-3 col-xl-5'>
                    <Typography component="legend"> 시작일 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="start-date"
                        value={startDate}
                        onChange={(startDate) => {
                        setSartDate(startDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    <div className='mt-2'>
                    <Typography component="legend"> 마감일 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="end-date"
                        value={endDate}
                        onChange={(endDate) => {
                        setEndDate(endDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="card shadow ml-3 mt-3 col-xl-4">
                <div className="card-header1 py-3">
                    <h6 className="m-0 font-weight-bold text-light">Member</h6>
                </div>
                <div className="card-body">
                    <div className="chart-bar">
                        <div className='row'>
                        <div className='col-xl-10'>
                        <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={Member}
                        getOptionLabel={(member) =>member.email +" "+ member.name}
                        renderInput={(params) => <TextField {...params} label="프로젝트 멤버 추가" />}
                        />
                        </div>
                        <div className='mt-2 col-xl-1'>
                        <button type="button" className="btn btn-secondary">add</button>
                        </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            </div>

            <center>
            <Link to="/project/myProject" style={{ textDecoration: "none" }}>
            <button type="button" className=" mt-4 mr-2 btn btn-secondary">Create</button>
            </Link>
            <Link to="/project/myProject" style={{ textDecoration: "none" }}>
            <button type="button" className=" mt-4 btn btn-secondary">취소</button>
            </Link>
            </center>
           </div>
            </SiteLayout>
        </div>
    );
};

export default CreateProject;