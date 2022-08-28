import React, {Fragment} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

import '../assets/scss/sb-admin-2.scss';


const SiteLayout = ({children}) => {
    return (     
        <Fragment>
            <div className='row'>
                <Navigation active={'default'}/>
                <div className="col-xl-10">
                    <div className='row'>
                        <Header/>
                        {children}
                        <Footer />
                    </div>
                </div>
            </div> 
        </Fragment>


    );
};

export default SiteLayout;