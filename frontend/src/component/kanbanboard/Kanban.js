import React, { useState, useEffect, useCallback } from 'react';
import SiteLayout from '../../layout/SiteLayout';
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck';
import { useParams } from 'react-router';
import { get, post } from '../../api/Axios';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from '@mui/material/Box';



const Kanban = () => {
  const params = useParams();
  const [deckList, setDeckLlist] = useState([]);
  const projectNo = params.no;
  const [createResult, setCreateResult] = useState(false);
  const [dtTodos, setDtTodos] = useState(deckList);

  useEffect(() => {
    t();
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }, [createResult])

  // 덱 리스트 가져오기
  const t = async () => {
    const list = await get(`/kanban/deck/find/${projectNo}`);
    setDeckLlist(list);
  }

   //덱 움직이기 
   const moveDeck = async () => {
    await post(`/kanban/deck/update/move`,deckList);
  }

  const onDragEnd = async (result) => {
    const currentList = [...deckList];
    const { destination, source } = result;

    if (!destination || source.index === destination.index ) {
      return;
    }

    const column = currentList[source.index-1];
    if (source.index < destination.index) {
      currentList.map((e,i)=>{
        if(e.sequence <= destination.index) {
          if(source.index >= e.sequence){
            return;
          }
          e.sequence = e.sequence -1
        }  
      })
  
      currentList[source.index-1]["sequence"] = destination.index;
    } else {
      currentList.map((e,i)=>{
        if(e.sequence >= destination.index){
          if(source.index <= e.sequence){
            return;
          }
          e.sequence = e.sequence +1
        } 
        //console.log("currentList>> ",e);
      })
  
      currentList[source.index-1]["sequence"] = destination.index;
    }

    currentList.sort((a, b)=> {
      return a.sequence - b.sequence;
    })
    
    setDeckLlist(currentList);
   
    await moveDeck();

  };
  
  console.log("babo1--------------------------------")
  return (
      <div className="col-xl-11 ml-4" style={{ width: "1000px", "overflow": "auto" }}>
        <div className="card-header" style={{ width: "3000px" }}>
          <h4 className=" col-xl-10 m-0 font-weight-bold text-primary"><BackupTableIcon fontSize="large" />&nbsp;Plendar Porject Kanban</h4>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="title" direction="horizontal">
            {provided => (
              <div className="card-body" {...provided.droppableProps} ref={provided.innerRef} style={{ width: "3000px", height: "750px" }}>
                {/* 덱 생성하기 버튼 */}
                <CreateDeck setCreateResult={setCreateResult} />
                <Box
                    sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        ml: 2,
                        width: 300,
                        height: 30
                    }
                }}>
                  {
                    deckList.map((data, index) => {
                      return (
                        <Draggable draggableId={String(index)} index={data.sequence} key={index} direction="horizontal">
                        {provided =>(
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Deck
                          no={data.no}
                          key={index}
                          deckTitle={data.title}
                          projectNo={projectNo}
                          index={index}
                        />
                        </div>
                        )}
                        </Draggable>
                      );
                    })}
                    </Box>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
  );
};

export default Kanban;
