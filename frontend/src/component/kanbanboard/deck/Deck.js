import React, { useEffect, useState } from 'react';
import CreateCard from '../card/CreateCard';
import Card from '../card/Card';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';


const Deck = ({title}) => {
    const [deckTitle, setDeckTitle] = useState(title);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);

    const onChangeTitle = (event) => {
        setDeckTitle(title);
        setDeckTitle(event.target.value);
    };

    const onClickDeckTitle = () => {
        setClickChk(clickChk+1);
        setChangeTitle(true)
        if(clickChk>2){
            onChangeTitle
            setChangeTitle(false);
            setClickChk(0);
        }
    }

    const keyEnter = (e) => {
       if(e.key == "Enter"){
        onChangeTitle
        setChangeTitle(false);
        setClickChk(0);
       }
    }
    useEffect(()=>{

    }, [title])
    const [morevertList, setMorevertList] = useState(false);

    return (
        <div className="card shadow col-xl-3 mb-4 mt-3 ml-3">
            <div className=" row card-header py-3">
                <div className="col-xl-10 mt-2" onClick={onClickDeckTitle}>
                    {changeTitle
                        ?
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            label='제목 수정'
                            maxRows={4}
                            value={deckTitle}
                            onChange={onChangeTitle}
                            onKeyPress={keyEnter}
                            sx={{ ml: 1 }}
                        />
                        :
                        <h5 className=" mb-2 font-weight-bold text-gray-dark">{title}</h5>
                    }
                </div>
                <div className="col-xl-2 mt-2">
                    <MoreVertIcon type="button" onClick={() => { setMorevertList(morevertList => !morevertList) }} />
                    {morevertList ? <MoreVertDropdown /> : null}
                </div>
            </div>
            <div className="card-body">
                <Card />
            </div>
        </div>
    );
};

export default Deck;