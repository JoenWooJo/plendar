import React, { useEffect, useState } from 'react';
import CreateCard from '../card/CreateCard';
import Card from '../card/Card';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import {get, postJson} from '../../../api/Axios';


const Deck = ({title, no, projectNo}) => {
    const [deckTitle, setDeckTitle] = useState(title);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [cardList, setCardList] = useState([]);

      // 카드 리스트 가져오기
    const t = async() => {    
        const list = await get(`/kanban/card/find/${no}`);
        setCardList((prevcCardlist)=>prevcCardlist.concat(list));
    }

    useEffect(() => {
        t();
    }, [])

    const onChangeTitle = (event) => {
        //setDeckTitle(title);
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

    //덱 수정하기 
    useEffect(()=>{
        postJson(`/kanban/deck/update`, JSON.stringify({title: deckTitle, no : no}));
    },[deckTitle, no]);
   
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
                            onChange={(e)=>onChangeTitle(e)}
                            onKeyPress={keyEnter}
                            sx={{ ml: 1 }}
                        />
                        :
                        <h5 className=" mb-2 font-weight-bold text-gray-dark">{deckTitle}</h5>
                    }
                </div>
                <div className="col-xl-2 mt-2">
                    <MoreVertIcon type="button" onClick={() => { setMorevertList(morevertList => !morevertList) }} />
                    </div>

                    {morevertList ? <MoreVertDropdown projectNo={projectNo}/> : null}
            </div>
            <div className="card-body">
                {
                    cardList.map((m, i) => (<Card key={i} card={m} projectNo={projectNo} deckNo={no}/>)
                 )}
            </div>
        </div>
    );
};

export default Deck;