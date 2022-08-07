import React, {Fragment} from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
// import '../assets/css/Plendar.css'
import '../assets/scss/sb-admin-2.scss';


const MyPageLayout = ({children}) => {
    return (     
       <>
        <Fragment>
        <div className="container">
            <div className='row'>
            <Navigation active={'mypage'}/>
            <div className="col-xl-10">
            <div className='row'>
            <Header />
            {children}
            <Footer />
            </div>
            </div>
            </div>
            </div>
        </Fragment>
        </>
        
    );
};

export default SiteLayout;