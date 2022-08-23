import React, { useState } from 'react';
import CreateCard from '../card/CreateCard';
import Card from '../card/Card';
import TextField from '@mui/material/TextField';

const Deck = () => {
    const [deckTitle, setDeckTitle] = useState('doing');
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);

    const onChangeTitle = (event) => {
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
    
    return (
        <div className="card shadow col-xl-4 mb-4 mt-3">
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
                        <h5 className=" mb-2 font-weight-bold text-gray-dark">{deckTitle} </h5>
                    }
                </div>
                <CreateCard />
            </div>
            <div className="card-body">
                <Card />
            </div>
        </div>


    );
};

export default Deck;