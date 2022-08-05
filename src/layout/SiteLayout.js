import React, {Fragment} from "react";
import Header from "../layout/Header";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
// import '../assets/css/Plendar.css'
import '../assets/scss/sb-admin-2.scss';


const SiteLayout = ({children}) => {
    return (     
       
        <Fragment>
        <div class="container">
            <div className='col-sm-3'>
                <Navigation />
            </div>

            <div className='row'>
                <div >
                    <Header />   
                </div>

            <div className='row' /> 
                    <Footer />
            </div>
        </div>
        </Fragment>

        
    );
};

export default SiteLayout;