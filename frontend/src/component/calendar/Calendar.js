import React from 'react';
import SiteLayout from '../../layout/SiteLayout';
import TeamCalendar from './TeamCalendar';

const calendar = () => {
    return (
        <SiteLayout>
        <div class="col-xl-10">
            <TeamCalendar />
        </div>
        </SiteLayout>
    );
};

export default calendar;