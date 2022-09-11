import React,{ useEffect, useState } from 'react';
import CreateCard from '../card/CreateCard';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertDropdown from './MoreVertDropdown';
import { get, postJson } from '../../../api/Axios';
import Paper from '@mui/material/Paper';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardLayout from '../card/CardLayout';


const Deck = ({ deckTitle, no, projectNo }) => {
    const [title, setTitle] = useState(deckTitle);
    const [changeTitle, setChangeTitle] = useState(false);
    const [clickChk, setClickChk] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [cardNo, setCardNo] = useState();
    const [refresh, setRefresh] = useState(false);
    const [morevertList, setMorevertList] = useState(false);
    const [taskCount, setTaskCount] = useState([]);
    const [nCount, setNCount] = useState([]);

    // 카드 리스트 가져오기
    const t = async () => {
        const list = await get(`/kanban/card/find/${no}`);
        setCardList(list);
      
       list.map((m,i)=>{
            cardTask(m.no);
            cardN(m.no);
            setCardNo(m.no);
       })
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

     //카드 테스크 개수
     const cardTask = async (cardNo) => {
        const list = await get(`/kanban/card/findtaskcount/${cardNo}`);
        setTaskCount((prevTaskCount)=>(prevTaskCount.concat([list])));
    }
    
    //테스크 완료 개수
    const cardN = async (cardNo) => {
        const list = await get(`/kanban/card/findncount/${cardNo}`);
        setNCount((prevNCount)=>(prevNCount.concat([list])));
    }

    useEffect(() => {
        console.log("테스크 개수",taskCount);
    }, [taskCount])

    useEffect(() => {
        console.log("미완료 개수",nCount);
    }, [nCount])


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

    const onDragEnd = () => {
        console.log("드래그")
      }

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
                            value={title}
                            onChange={(e) => onChangeTitle(e)}
                            onKeyPress={keyEnter}
                            sx={{ml: 1 }}
                            size="small"
                        />
                        :
                        <h5 className="mb-3 font-weight-bold text-gray-dark">{title}</h5>
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
                
                <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="card">
                {provided =>(
                <div className="card-body" ref={provided.innerRef} {...provided.droppableProps}>
                    {
                        cardList.map((data, index) => (
                        <Draggable draggableId={String(data.no)} index={index} key={index} direction="horizontal">
                        {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CardLayout key={index} nCount={nCount} taskCount={taskCount} title={data.title} card={data} projectNo={projectNo} deckNo={no} refresh={refresh} setRefresh={setRefresh} />
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
                </DragDropContext>
            </div>
        </Paper>
    );
};

export default Deck;