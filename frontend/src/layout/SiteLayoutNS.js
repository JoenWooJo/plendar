import React, {Fragment} from "react";
import Header from "../layout/Header";
import NavigationNS from "../layout/NavigationNS";
import Footer from "../layout/Footer";
// import '../assets/css/Plendar.css'
import '../assets/scss/sb-admin-2.scss';

const SiteLayoutNS = ({children}) => {
    return (     
        <Fragment>
            <div className='row'>
            <NavigationNS active={'default'}/>
            <div className="col-xl-10">
            <div className='row'>
            <Header />
            {children}
            <Footer />
            </div>
            </div>
            </div>
        </Fragment>
    );
};

export default SiteLayoutNS;