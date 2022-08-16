import React from 'react';
import SiteLayout from '../../layout/SiteLayout';
import TeamCalendar from './TeamCalendar';
import PersonalCalendar from './PersonalCalendar';

const calendar = () => {
    return (
        <SiteLayout>
        <div className="col-xl-10">
            <p>팀</p>
            <TeamCalendar />
            <p>개인</p>
            <PersonalCalendar />
        </div>
        </SiteLayout>
    );
};

export default calendar;