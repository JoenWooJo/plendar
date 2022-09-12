import React from 'react';
import { Outlet } from 'react-router';
import SiteLayout from './layout/SiteLayout';

const About = () => {
    return (
        <SiteLayout>
            <Outlet />
        </SiteLayout>
    );
};

export default About;