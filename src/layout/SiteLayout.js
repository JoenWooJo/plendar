import React, {Fragment} from "react";
import Header from "../layout/Header";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
// import '../assets/css/Plendar.css'
import '../assets/scss/sb-admin-2.scss';


const SiteLayout = () => {
    return (
        <div id="Wrapper">
        <Fragment>
            <Header />
            <Navigation />
            <Footer />
        </Fragment>
        </div>
    );
};

export default SiteLayout;