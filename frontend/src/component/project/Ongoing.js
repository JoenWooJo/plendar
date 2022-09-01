import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { Link } from 'react-router-dom';

const Ongoing = ({
    no,
    title,
    description,
    endDate,
    finished,
    priority,
    startDate,
    }) => {
    const [morevertList, setMorevertList] = useState(false);
    const projectData = {
        no: no,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        priority: priority
    }

    return (
        <div className="col-xl-3  mb-4"  key={no}  >
            <div className="card border-left-primary shadow h-100 py-2" >
                <div className="card-body" >
                    <div className="row no-gutters align-items-center" >
                        <div className="col mr-2">
                            <div className='row'>
                                <div className="col-xl-10 text-xs font-weight-bold text-primary text-uppercase mb-1">진행중</div>
                                <div className=" col-xl-2 nav-link" href="#" role="button" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" style={{ float: 'right' }} >
                                    <MoreVertIcon onClick={e => { setMorevertList(morevertList => !morevertList) }} />
                                    {morevertList ? <MoreVertDropdown projectNo={no} projectData={projectData}/> : null}
                                </div>
                            </div>
                            <Link to={`/kanbanboard/${no}`} className="h5 mb-0 font-weight-bold text-gray-800" >{title}</Link>
                            <div className="text-xs text-gray text-uppercase mt-5">{startDate} ~{endDate}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ongoing;