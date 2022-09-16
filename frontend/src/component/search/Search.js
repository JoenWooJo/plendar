import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import Ongoing from '../project/Ongoing';
import Box from '@mui/material/Box';
import { Rating, Typography } from '@mui/material';

import '../../assets/css/font.css';


const Search = () => {
    const params = useParams();
    const word = params.word;
    const [list, setList] = useState([]);
    const [ongoingList, setOngoingList] = useState([]);
    const [finishedList, setFinishedList] = useState([]);

    const [checked, setChecked] = useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
        if(event.target.checked) {
            setOngoingList(list.filter((proj) => {
                if(proj["finished"] == "Y"){
                    return proj
                }
            }));
            setFinishedList(list.filter((proj) => {
                if(proj["finished"] == "N"){
                    return proj
                }
            }));
        } else {
            setOngoingList([]);
            setFinishedList([]);
        }
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
        if(event.target.checked) {
            setOngoingList(list.filter((proj) => {
                if(proj["finished"] == "N"){
                    return proj
                }
            }));
        } else {
            setOngoingList([]);
        }
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
        if(event.target.checked) {
            setFinishedList(list.filter((proj) => {
                if(proj["finished"] == "Y"){
                    return proj
                }
            }));
        } else {
            setFinishedList([]);
        }
    };

    const searchProject = async () => {
        const resp = await axios.get(`/api/project/search/${word}`, {
            params: {userNo: localStorage.getItem("loginUserNo")},
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
    
        setList(resp.data.data);
        setOngoingList(resp.data.data.filter((proj) => {
            if(proj["finished"] == "N"){
                return proj
            }
        }));
    }

    useEffect(() => {
        searchProject();
    }, [word]);

    const children = (
        <Box sx={{ flexDirection: 'column', ml: 3 }}>
          <FormControlLabel
            label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>진행중</Typography>}
            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
          />
          <FormControlLabel
            label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>완료</Typography>}
            control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
          />
        </Box>
      );

    return (
        <div className="col-xl-11 ml-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary" style={{fontFamily: "IBMPlexSansKR-Regular"}} ><PlagiarismIcon fontSize='large'/> &nbsp;"{word}"에 대한 검색 결과</h4>
                </div>
                <div className="card-body" style={{ height: "680px", overflow: "auto" }} >
                    <div>
                        <div className="btn-group btn-group-toggle" data-toggle="button">
                        <FormControlLabel
                        label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>전체</Typography>}
                        control={
                            <Checkbox
                                checked={checked[0] && checked[1]}
                                indeterminate={checked[0] !== checked[1]}
                                onChange={handleChange1}
                            />
                        }
                        />
                    </div>
                    {children}
                </div>
                {console.log(ongoingList.concat(finishedList))}
                <div className="row mb-4" style={{ overflow: "auto" }}>
                        {
                            ongoingList.concat(finishedList) != 0 &&
                            ongoingList.concat(finishedList).map((m,i)=> {
                                if (m.finished == "N") {
                                    return (
                                        <Ongoing
                                            key={i}
                                            no={m.no}
                                            title={m.title}
                                            description={m.description}
                                            endDate={m.endDate}
                                            startDate={m.startDate}
                                            finished={m.finished}
                                            priority={m.priority}
                                            leader= {m.leader}
                                            
                                        />
                                    )
                                } else {
                                    return (
                                        <div className="col-xl-3  mb-4" key={i}>
                                            <div className="card border-left-secondary shadow h-100 py-2">
                                                <div className="card-body" >
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold text-gray text-uppercase mb-1">
                                                                완료</div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{m.title}</div>
                                                            <div className='mt-3'>
                                                                <Rating
                                                                    value={m.priority}
                                                                    size="small"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="text-xs text-gray text-uppercase mt-3">
                                                                {m.startDate} ~{m.endDate}</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                
                            })  
                        }
                    </div>
                    {
                        ongoingList.concat(finishedList) == 0 &&
                        <center>
                        <div style={{marginTop: "150px"}}>
                        <img src='/assets/images/not-found.png' style={{width: "80px"}} />
                        <h4 style={{marginTop: "30px", fontFamily: 'IBMPlexSansKR-Regular'}}>검색 결과가 없습니다...</h4>
                        </div>
                        </center>
                    }
                </div>
            </div>
    );
};

export default Search;