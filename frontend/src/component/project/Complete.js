import React,{useState} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';

const Complete = () => {
    const [morevertList, setMorevertList] = useState(false);
    var x = localStorage.getItem("");
    return (
        <div className="col-xl-3  mb-4">
            <div className="card border-left-secondary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className='row'>
                                <div className="col-xl-10 text-xs font-weight-bold text-gray text-uppercase mb-1">완료</div>
                                <div className=" col-xl-2 nav-link" href="#" role="button" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="flase" style={{ float: 'right' }} >
                                    <MoreVertIcon onClick={e => { setMorevertList(morevertList => !morevertList) }} />
                                    {morevertList ? <MoreVertDropdown /> : null}
                                </div>
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">채원이의 미니프로젝트</div>
                            <div className="text-xs text-gray text-uppercase mt-5">
                                생성일:2022/08/15</div>
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

export default Complete;