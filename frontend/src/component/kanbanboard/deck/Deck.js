import React,{ useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { get, postJson } from '../../../api/Axios';
import Paper from '@mui/material/Paper';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from '../card/Card';

import '../../../assets/css/font.css';
import { Typography } from '@mui/material';

const Deck = ({ deckTitle, no, projectNo }) => {
    const [title, setTitle] = useState(deckTitle);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [cardNo, setCardNo] = useState();
    const [refresh, setRefresh] = useState(false);
    const [morevertList, setMorevertList] = useState(false);
    const [state, setState] = useState();

    // 카드 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/card/find/${no}`);
        setCardList(list);
    }

    useEffect(()=>{
        if(deckTitle !== title) {
            setTitle(deckTitle);
        }
    }, [deckTitle]);
    
    useEffect(() => {
        t();
    }, [refresh])

    useEffect(() => {
        t();
    }, [no])

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
    }
    const keyEnter = (e) => {
        console.log(e.target.value);
        if (e.key == "Enter") {
            postJson(`/kanban/deck/update`, JSON.stringify({ title: title, no: no, cardNo: cardNo }));
            setChangeTitle(false);
            setClickChk(0);
        }
    }

    const onDragEnd = async (result) => {
        const currentList = [...cardList];
        const { destination, source, draggableId } = result;
    
        //위치 예외처리
        if (!destination || source.index === destination.index ) {
            return;
          }
        
        //출발지점의 값
        const column = currentList[source.index];
        //기존 state를 mutatins 하는것을 막기위해 새로운 배열 만들기
        const newTaskIds = Array.from(column.sequence);
        
        console.log("출발지점의 값 column:", column);
        

        // 원래 원소를 제거하고 destination에 원소를 끌어 놓아서 재배열
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        console.log("새로운 배열 newTaskIds", newTaskIds);

        const newColumn = {
          ...column,
          index: newTaskIds,
        };
    
        const newState = {
          ...state,
          index: {
            ...state,
            [newColumn.id]: newColumn,
          },
        };
    
       setState(newState);
      };

    //   const Container = styled.div`
    //     flex-direction: column;
    //   `;    

    return (
        <Paper>

            <div className="row">
                <div className="col-xl-9 mt-4 ml-3" onClick={onClickDeckTitle}>
                    {changeTitle
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
                    /> : null}
                </div>
                
                <DragDropContext onDragEnd={onDragEnd}>
                {/* <Container> */}
                <Droppable droppableId="card">
                {provided =>(
                <div className="card-body" ref={provided.innerRef} {...provided.droppableProps}>
                    {
                        cardList.map((data, index) => (
                        <Draggable draggableId={String(data.no)} index={index} key={index} direction="horizontal">
                        {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card key={index} title={data.title} card={data} projectNo={projectNo} deckNo={no} refresh={refresh} setRefresh={setRefresh} />
                        {provided.placeholder}
                        </div>
                        )}
                        </Draggable>
                        )
                        )}
                    {provided.placeholder}
                </div>
                )}
                </Droppable>
                {/* </Container> */}
                </DragDropContext>
            </div>
        </Paper>
    );
};

export default Deck;