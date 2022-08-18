import React, { useState } from "react";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import SiteLayout from '../../layout/SiteLayout';


const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      backgroundColor: "#fff",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "어케하누..?",
          task:[
                  {
                    id:22,
                    title: "task1"
                  }
                ]
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    }
  ]
};


function UncontrolledBoard() {
 const[task, setTask]=useState("task");
  return (
    
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "bottom" }}
     //카드 추가
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        tesk: task,
        ...draftCard
      })}
      onCardNew={console.log}
      allowAddColumn={{ on: "right" }}
      //덱추가
      onNewColumnConfirm={(draftColumn) => ({
        id: [new Date().getTime()],
        title: "new Card",
        ...draftColumn
      })}
      onColumnNew={console.log}
    >
    </Board>
  );
}


const kanban = () => {
  return (

    <SiteLayout>
      <div className="col-xl-11 ml-4">
        <div className="card shadow mb-4">
          <div className="card-header1 py-3">
            <h6 className="m-0 font-weight-bold text-light"> plendar project kanban</h6>
          </div>
          <div className="card-body">
            <UncontrolledBoard />
          </div>
        </div>
      </div>
    </SiteLayout>

  );
};

export default kanban;