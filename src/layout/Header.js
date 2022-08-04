import React from 'react';
import '../assets/scss/sb-admin-2.scss';


const Header = () => {
   return (
    <body id="page-top">

        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

            {/* <!-- Contesnt Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
                        {/* <!-- Topbar Search --> */}
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                    aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                    {/* <!-- End of Topbar --> */}

                </div>
                {/* <!-- End of Main Content --> */}


            </div>
            {/* <!-- End of Content Wrapper --> */}

        {/* <!-- End of Page Wrapper --> */}
        </div>

    </body>
   );
};

export default Header;