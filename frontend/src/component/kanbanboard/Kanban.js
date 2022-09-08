import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck';
import { useParams } from 'react-router';
import { get } from '../../api/Axios';
import Box from '@mui/material/Box';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { color } from '@mui/system';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let currentPath = "";

const Kanban = () => {
  let location = useLocation();
  
  const state = location.state;
  const cardView = state != null ? state["cardNo"] : "";
  const noticeType = state != null ? state["type"] : "";
  const noticeNo = state != null && state["noticeNo"] ? state["noticeNo"] : "";
  const params = useParams();
  const [deckList, setDeckLlist] = useState([]);
  const [projectNo, setProjectNo] = useState(0);
  const [createResult, setCreateResult] = useState(false);
  
  if(projectNo !== params.no) {
    setProjectNo(params.no);
  }

  useEffect(() => {
    t();
  }, [createResult])

  useEffect(() => {
    console.log("t() called", projectNo);
    t();
  }, [projectNo])

  useEffect(() => {
    if(currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;
  }, [location]);

  // 덱 리스트 가져오기
  const t = async () => {
    const list = await get(`/kanban/deck/find/${projectNo}`);
    setDeckLlist(list);
  }



  // DragEnd  함수
  const onDragEnd = () => {
    console.log("드래그")
  }

  useEffect(()=>{
    console.log(state,cardView, noticeType, noticeNo)
      const f = () => {
          let child = noticeType == "comment" ? document.getElementById(`new-img-${noticeNo}`) : document.getElementById("new-img");
          child != null && child.parentNode.removeChild(child);
        }
        document.addEventListener("click", f)

        
    }, [state])

  return (
      <div className="col-xl-11 ml-4" style={{ width: "1000px", "overflow": "auto" }}>
        <div className="card-header" style={{ width: "3000px" }}>
          <h4 className=" col-xl-10 m-0 font-weight-bold text-primary"><BackupTableIcon fontSize="large" />&nbsp;Plendar Porject Kanban</h4>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="title">
            {provided => (
              <div className="card-body" style={{ width: "3000px", height: "750px", "overflow": "auto" }} {...provided.droppableProps} ref={provided.innerRef}>
                {/* 덱 생성하기 버튼 */}
                <CreateDeck setCreateResult={setCreateResult} />
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      ml: 2,
                      width: 300,
                      height: 80
                    }
                  }}>
                  {
                    deckList.map((m, i) => {
                      return (
                        <Draggable draggableId={String(i)} index={i} key={i}>
                        {provided =>(
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Deck
                            no={m.no}
                            key={i}
                            deckTitle={m.title}
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
