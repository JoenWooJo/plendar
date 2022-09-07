import React, { useState, useEffect, useCallback } from 'react';
import SiteLayout from '../../layout/SiteLayout';
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck';
import { useParams } from 'react-router';
import { get } from '../../api/Axios';
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
  }, [createResult])

  // 덱 리스트 가져오기
  const t = async () => {
    const list = await get(`/kanban/deck/find/${projectNo}`);
    setDeckLlist(list);
  }

  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      source.index === destination.index
    )
      return;

    const column = deckList[source.index-1];
    // console.log("11",deckList[source.index-1])
    // console.log(deckList[source.index-1])
    if (source.index < destination.index) {
      deckList.map((e,i)=>{
        if(e.sequence <= destination.index) {
          if(source.index >= e.sequence){
            return;
          }
          e.sequence = e.sequence -1
        }  
        // if(e.sequence >= destination.index){
          // e.sequence = e.sequence +1
        // } 
        console.log("deckList>> ",e);
      })
  
      deckList[source.index-1]["sequence"] = destination.index;
  
      console.log("---------", source.index-1)
      console.log("-----destination----", destination.index)
      console.log("----column-----",column)
    }

    else {
      deckList.map((e,i)=>{
        if(e.sequence >= destination.index){
          if(source.index <= e.sequence){
            return;
          }
          e.sequence = e.sequence +1
        } 
        console.log("deckList>> ",e);
      })
  
      deckList[source.index-1]["sequence"] = destination.index;
  
      console.log("---------", source.index-1)
      console.log("-----destination----", destination.index)
      console.log("----column-----",column)
    }
    console.log("-------------------------------")
    deckList.map((e)=>{console.log("REAL>>", e)})
    
   
  }, [deckList]);

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
                          title={data.title}
                          projectNo={projectNo}
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
