import React from 'react';
import Complete from './Complete';
import { NavLink, Link } from 'react-router-dom';
import SiteLayout from '../../layout/SiteLayout';

const CompletePage = () => {
    return (
        <SiteLayout>

            <div className="col-xl-11 ml-4">

                <div className="card shadow mb-4">
                    <div className="card-header2 py-3">
                        <h6 className="m-0 font-weight-bold text-light"> Complete project</h6>
                    </div>
                    <div className="card-body">
                            <div className="d-sm-flex align-items-center justify-content-between col-xl-12 mb-4">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-secondary ">
                                        <Link to="/project/myproject" className='text-white' style={{ textDecoration: "none" }}> 진행중</Link>
                                    </label>
                                    <label className="btn btn-secondary active">
                                        <Link to="/project/completepage" checked className='text-white' style={{ textDecoration: "none" }}> 완료</Link>
                                    </label>
                                </div>
                                <NavLink className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" to={'/project/createProject'}>
                                    <i className="fas fa-download fa-sm text-white-50"></i>
                                    create project
                                </NavLink>
                            </div>

                        <div className="row">
                           <Complete/>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default CompletePage;