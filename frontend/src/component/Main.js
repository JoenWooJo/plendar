import React, {useEffect, useState} from 'react';
import '../assets/scss/sb-admin-2.scss';
import { Link } from 'react-router-dom';

const Main = () => {

    const[headerTitle,setHeaderTitle]= useState('dddd');

    return (
            <div className="col-xl-11 ml-4">
                <div className="card shadow">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light">Let's start plendar</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                        <img src="img/project.png" style={{width:'300px'}}></img>
                        <br/><br/>
                        <Link to="/project/createProject" style={{ textDecoration: "none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6667ab" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                        </Link>
                        </div>
                        <br/>
                        <p> 
                            프로젝트 관리 웹 plendar는 프로젝트 진행 상황을 한눈에 파악할 수 있도록 만들어진 도구입니다. 
                            이를 통해 관리자는 프로젝트 마감 시간을 단축하고 전반적인 비용을 절감할 수 있습니다. 
                            plendar는 필수 도구 외에 여러 기능도 포함되어 있는데요. 
                            plendar를 사용하면 시간과 예산에 맞춰 프로젝트의 추적 및 협업을 하기가 매우 쉽습니다.
                        </p>
                        <a target="_blank" rel="nofollow" href="#">How to use plendar? &rarr;</a>
                    </div>
                </div>         
            </div>
    );
};

export default Main;