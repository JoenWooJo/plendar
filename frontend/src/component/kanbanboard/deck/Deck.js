import React,{ useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { get, postJson } from '../../../api/Axios';
import Paper from '@mui/material/Paper';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from '../card/Card';
import '../../../assets/css/font.css';
import { Typography } from '@mui/material';

export default function Deck ({ deckTitle, no, projectNo, manager, index, deck, cards }){

    const [title, setTitle] = useState(deckTitle);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [cardNo, setCardNo] = useState();
    const [refresh, setRefresh] = useState(false);
    const [morevertList, setMorevertList] = useState(false);
    const [state, setState] = useState();

    useEffect(()=>{
        if(deckTitle !== title) {
            setTitle(deckTitle);
        }
    }, [deckTitle]);

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const onClickDeckTitle = () => {
        setClickChk(clickChk + 1);
        setChangeTitle(true)
        if (clickChk > 2) {
            postJson(`/kanban/deck/update`, JSON.stringify({ title: title, no: no, cardNo: cardNo }));
            setChangeTitle(false);
            setClickChk(0);
        }
    };

    const notClickDeckTitle = () => {
        console.log("권한이 없습니다");
        }


    const keyEnter = (e) => {
        if (e.key == "Enter") {
            postJson(`/kanban/deck/update`, JSON.stringify({ title: title, no: no, cardNo: cardNo }));
            setChangeTitle(false);
            setClickChk(0);
        }
    }

    return (<Draggable
        draggableId={`deck:${no}`}
        index={index}>
        {(provided) => (<Paper
            ref={provided.innerRef}
            {...provided.draggableProps}>
            <div className="row" 
                {...provided.dragHandleProps}>
                <div className="col-xl-9 mt-4 ml-3" onClick={manager.length != 0 ? onClickDeckTitle :notClickDeckTitle}>
                    { changeTitle
                        ?
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>제목 수정</Typography>}
                            maxRows={4}
                            value={title}
                            onChange={(e) => onChangeTitle(e)}
                            onKeyPress={keyEnter}
                            sx={{ml: 1 }}
                            size="small"
                        />
                        :
                        <h5 className="mb-3 font-weight-bold text-gray-dark" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{title}</h5>
                    }
                </div>
                <div className="col-xl-2 mt-2">
                    <MoreVertIcon type="button" onClick={() => { setMorevertList(morevertList => !morevertList) }} />
                    {morevertList ? <MoreVertDropdown
                        projectNo={projectNo}
                        deckNo={no}
                        cardNo={cardNo}
                        setRefresh={setRefresh}
                        setMorevertList={setMorevertList}
                        manager = {manager}
                    /> : null}
                </div>
                
                <Droppable
                    droppableId={`deck:${deck.no}`}
                    type={"CARD"}>
                {(dropProvided) => (<div className="card-body" 
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}>
                    {       
                        cards.map((data, index) => (
                        <Card   key={index} 
                                title={data.title} 
                                card={data} 
                                projectNo={projectNo} 
                                deckNo={no} 
                                refresh={refresh} 
                                setRefresh={setRefresh} 
                                manager={manager} 
                                index={index}
                                sequence={data.sequence}
                                cards={data}
                        />))}
                    {dropProvided.placeholder}
                </div>)}
                </Droppable>
                </div>
        </Paper>)}
        </Draggable>);
};