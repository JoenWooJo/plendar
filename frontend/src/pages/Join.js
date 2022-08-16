import React from 'react';
import '../assets/scss/sb-admin-2.scss';

const Join = () => {
    return (
    <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block "><img src="img/logo.png"></img></div>
                    <div className="col-lg-6">
                        
                        <div className="p-5">
                            
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form className="user">
                                <div className="form-group">
                                        <input type="text" className="form-control form-control-user" id="name"
                                            placeholder="Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address"/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                    </div>
                                </div>
                                <a href="/login" className="btn btn-primary btn-user btn-block">
                                    Register Account
                                </a>
                            </form>
                            <hr/>
                            <div className="text-center">
                                <a className="small" href="/forgotpw">Forgot Password?</a>
                            </div>
                            <div className="text-center">
                                <a className="small" href="/login">Already have an account? Login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default Join;

