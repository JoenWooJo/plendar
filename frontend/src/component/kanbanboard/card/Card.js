import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddTask from '../task/AddTask';
import CardModal from './cardmodal/CardModal';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Card = () => {
    const [showDetail, setShowDetail] = useState(false);


    const onChangeCard = () => {
        setShowDetail(showDetail => !showDetail)
    }

    return (
        <div>
            <div className="card bg-light text-black shadow">
                <div className="card-body">
                    <div className='row'>
                    <div className="col-xl-10 mt-2">
                        <CardModal/>
                    </div>
                    <AddTask/>
                    </div>
                    <div className='row'>
                        <div className="col-xl-9 mt-3 text-black-50 small">이건 이 카드의 설명</div>
                        <div className='col-xl-2 mt-2' onClick={onChangeCard}>
                            {showDetail ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

                        </div>
                    </div>
                    {showDetail
                        ?
                        <div>
                            <hr />
                            <Checkbox {...label} /> 도훈이 떄리기 <br />
                            <Checkbox {...label} /> 채원이 놀리기 <br />
                            <Checkbox {...label} /> 윤호 혼내기 <br />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;