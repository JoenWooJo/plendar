import React, { useEffect, useState } from 'react';
import CreateCard from '../card/CreateCard';
import Card from '../card/Card';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { get, postJson } from '../../../api/Axios';
import Paper from '@mui/material/Paper';
import { Droppable, Draggable } from "react-beautiful-dnd";

const Deck = ({ title, no, projectNo }) => {
    const [deckTitle, setDeckTitle] = useState(title);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [cardNo, setCardNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [morevertList, setMorevertList] = useState(false);

    // 카드 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/card/find/${no}`);
        setCardList(list);
    }

    useEffect(() => {
        t();
    }, [refresh])

    const onChangeTitle = (event) => {
        setDeckTitle(event.target.value);
    };

    const onClickDeckTitle = () => {
        setClickChk(clickChk + 1);
        setChangeTitle(true)
        if (clickChk > 2) {
            onChangeTitle
            setChangeTitle(false);
            setClickChk(0);
        }
    }

    const keyEnter = (e) => {
        if (e.key == "Enter") {
            onChangeTitle
            setChangeTitle(false);
            setClickChk(0);
        }
    }

    //덱 수정하기 
    useEffect(() => {
        postJson(`/kanban/deck/update`, JSON.stringify({ title: deckTitle, no: no, cardNo: cardNo }));
    }, [deckTitle]);


    return (
        <Paper>
            <div className="row">
                <div className="col-xl-9 mt-4 ml-3" onClick={onClickDeckTitle}>
                    {changeTitle
                        ?
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            label='제목 수정'
                            maxRows={4}
                            value={deckTitle}
                            onChange={(e) => onChangeTitle(e)}
                            onKeyPress={keyEnter}
                            sx={{ml: 1 }}
                            size="small"
                        />
                        :
                        <h5 className="mb-3 font-weight-bold text-gray-dark">{deckTitle}</h5>
                    }
                </div>
                <div className="col-xl-2 mt-2">
                    <MoreVertIcon type="button" onClick={() => { setMorevertList(morevertList => !morevertList) }} />
                    {morevertList ? <MoreVertDropdown
                        projectNo={projectNo}
                        no={no}
                        cardNo={cardNo}
                        setRefresh={setRefresh}
                    /> : null}
                </div>
                <div className="card-body">
                    {
                        cardList.map((m, i) => (<Card key={i} card={m} projectNo={projectNo} deckNo={no} refresh={refresh} setRefresh={setRefresh} />)
                        )}
                </div>
            </div>

        </Paper>
    );
};

export default Deck;