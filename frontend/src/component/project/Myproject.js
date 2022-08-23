import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SiteLayout from '../../layout/SiteLayout';

import Ongoing from './Ongoing';

const Myproject = () => {

    return (
        <SiteLayout>
            <div className="col-xl-11 ml-4">
                <div className="card shadow mb-4">
                    <div className="card-header1 py-3">
                        <h6 className="m-0 font-weight-bold text-light"> My project</h6>
                    </div>
                    <div className="card-body">
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

                        <div className="row mb-4">
                            <Ongoing />
                        </div>

                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default Myproject;