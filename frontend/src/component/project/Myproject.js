import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SiteLayout from '../../layout/SiteLayout';

const Myproject = () => {

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
            <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light"> My project</h6>
                    </div>
                    <div className="card-body">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-secondary">
                            <Link to ="/project/myproject" className='text-white' style={{ textDecoration: "none" }}> 진행중</Link>
                        </label>
                        <label className="btn btn-secondary">
                            <Link to="/project/complete " className='text-white' style={{ textDecoration: "none" }}> 완료</Link>
                        </label>
                    </div>

                    <NavLink className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        to={'/project/createProject'}>
                        <i className="fas fa-download fa-sm text-white-50"></i>
                        create project </NavLink>
                </div>
                <div className="row">
                <div className="col-xl-3  mb-4">
                            <div className="card border-left-secondary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-gray text-uppercase mb-1">
                                                완료</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">채원이의 미니프로젝트</div>
                                            <div className="text-xs text-gray text-uppercase mt-5">
                                                생성일:2022/08/15</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3  mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                진행중</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">도훈이의 미니프로젝트</div>
                                            <div className="text-xs text-gray text-uppercase mt-5">
                                                생성일:2022/08/15</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default Myproject;