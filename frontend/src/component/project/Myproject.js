import React, { useState,useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SiteLayoutNS from '../../layout/SiteLayoutNS';
import axios from 'axios';
import Ongoing from './Ongoing';

const Myproject = () => {
    const [projectList, setProjectList] = useState([]);


    
    useEffect(() => {
        const fetchAndProjectList = async () => {
            await axios.get('/api/project/find/project')
            .then((resp) => {
                const list = resp.data.data;
                setProjectList(list);
                console.log(list);
            })
        }
        fetchAndProjectList();
    }, []);

    return (
        <SiteLayoutNS>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4" >
                    <div className="card-header1 py-3" >
                        <h6 className="m-0 font-weight-bold text-light"> My project</h6>
                    </div>
                    <div className="card-body" style={{ height: "750px", overflow:"auto"}} >
                        <div className="d-sm-flex align-items-center justify-content-between col-xl-12 mb-4 ">
                            <div className="btn-group btn-group-toggle" data-toggle="button">
                                <label className="btn btn-secondary active">
                                    <Link to="/project/myproject" className='text-white ' style={{ textDecoration: "none" }}> 진행중</Link>
                                </label>
                                <label className="btn btn-secondary">
                                    <Link to="/project/completepage " className='text-white' style={{ textDecoration: "none" }}> 완료</Link>
                                </label>
                            </div>

                            <NavLink className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" to={'/project/createProject'}>
                                <i className="fas fa-download fa-sm text-white-50"></i>
                                create project
                            </NavLink>
                        </div>

                        <div className="row mb-4"  style={{  overflow:"auto"}}>
                            {
                                projectList.map((m,i)=>{
                                    return(
                                 <Ongoing 
                                    key={i}
                                    no={m.no}
                                    title={m.title}
                                    description={m.description}
                                    endDate={m.endDate}
                                    startDate={m.startDate}
                                    finished={m.finished}
                                    priority={m.priority}
                                    />
                                 );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </SiteLayoutNS>
    );
};

export default Myproject;