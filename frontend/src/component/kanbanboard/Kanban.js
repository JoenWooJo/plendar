import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck';
import { useParams } from 'react-router';
import { get, post } from '../../api/Axios';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Box from '@mui/material/Box';


let currentPath = "";

export default function KanbanBoard() {
  let location = useLocation();

  const state = location.state;
  const cardView = state != null ? state["cardNo"] : "";
  const noticeType = state != null ? state["type"] : "";
  const noticeNo = state != null && state["noticeNo"] ? state["noticeNo"] : "";
  const params = useParams();
  const [deckList, setDeckLlist] = useState([]);
  const [projectNo, setProjectNo] = useState(0);
  const [createResult, setCreateResult] = useState(false);
  const [leaderNO, setLeaderNo] = useState([]);
  const [title, setTitle] = useState();
  const [decks, setDecks] = useState([]);
  const [cardMoving, setCardMoving] = useState(null);
  const [deckMoving, setDeckMoving] = useState(null);

  if (projectNo !== params.no) {
    setProjectNo(params.no);
  }

  //title
  const projectTitle = async () => {
    const list = await get(`/project/title/${projectNo}`);
    setTitle(list);
  }

  useEffect(() => {
    fetchDecks();
  }, [createResult])

  useEffect(() => {
    fetchDecks();
    findMember();
    projectTitle();
  }, [projectNo])

  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;
  }, [location]);

  // ------------------------------드래그 앤 드롭---------------------------------------------------
  const moveDeck = async () => {
    try {
        const response = await fetch(`/api/kanban/deck/mv`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 Authorization: window.localStorage.getItem("Authorization"),
            },
            body: JSON.stringify(deckMoving)
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        if (json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);
        }
    } catch (err) {
        console.error(err);
    }
}
  const moveCard = async () => {
    try {
      const response = await fetch(`/api/kanban/card/mv`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: window.localStorage.getItem("Authorization"),
        },
        body: JSON.stringify(cardMoving)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //덱, 카드 전체 가져오기
  const fetchDecks = async () => {
    try {
      const response = await fetch(`/api/kanban/deck/${projectNo}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: window.localStorage.getItem("Authorization"),
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }

      setDecks(json.data);
      console.log("=====덱 + 카드 =====", json.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  const onDragEnd = (result) => {
    console.info(result);

    // 1. 드롭이 가능한 곳에 드롭을 하지 않았음.
    if (!result.destination) {
      console.info('Dropped Nowhere');
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // 2. 움직이지 않았음.
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      console.info('Did Not Move Anywhere')
      return;
    }

    // 3. 덱 순서 바꾸기
    if (result.type === 'DECK') {
      console.info('Reordering Deck');

      const srcDeckIndex = source.index;
      const destDeckIndex = destination.index;

      const newDecks = [...decks];
      const [deckRemoved] = newDecks.splice(srcDeckIndex, 1);
      newDecks.splice(destDeckIndex, 0, deckRemoved);

      setDecks(newDecks);
      setDeckMoving({
          no: result.draggableId.split(":")[1],
          destOrderNo: destDeckIndex,
          srcOrderNo: srcDeckIndex
      });

      return;
    }

    // 4. 두 개의 다른 덱들 또는 하나의 같은 덱에서 카드 이동 하기
    if (result.type === 'CARD') {
      console.info('Moving Card between 2 Different Decks or in a Same Deck');

      const srcDeckNo = source.droppableId.split(":")[1];
      const srcCardIndex = source.index;
      const destDeckNo = destination.droppableId.split(":")[1];
      const destCardIndex = destination.index;

      const newDecks = [...decks];
      const indexSrcDeck = newDecks.findIndex(e => e.no == srcDeckNo)
      const indexDestDeck = newDecks.findIndex(e => e.no == destDeckNo)

      const [cardRemoved] = newDecks[indexSrcDeck].cards.splice(srcCardIndex, 1);
      newDecks[indexDestDeck].cards.splice(destCardIndex, 0, cardRemoved);

      setDecks(newDecks);
      setCardMoving({
        no: result.draggableId.split(":")[1],
        dest: {
          deckNo: destDeckNo,
          orderNo: destCardIndex
        },
        src: {
          deckNo: srcDeckNo,
          orderNo: srcCardIndex
        }
      });
    }
  }

    useEffect(() => {
      deckMoving && moveDeck();
  }, [deckMoving]);

  useEffect(() => {
      cardMoving && moveCard();
  }, [cardMoving]);

  //---------------------------권한 관리-------------------------------------
  const findMember = async () => {
    const list = await get(`/project/find/member/${projectNo}`);
    setLeaderNo(list);
  }

  //멤버의 리더, 매니저 뽑기 
  const managerList = leaderNO.filter((m) => {
    return (
      m.leader == 1 || m.manager == 1
    );
  })

  useEffect(() => {
    const f = () => {
      let child = noticeType == "comment" ? document.getElementById(`new-img-${noticeNo}`) : document.getElementById("new-img");
      child != null && child.parentNode.removeChild(child);
    }
    document.addEventListener("click", f)


  }, [state])

  //로컬스토리지 유저 뽑기
  const uu = localStorage.getItem('loginUserNo');
  //리더, 매니저 가져오기
  const manager = managerList.filter((m) => (m.no == uu));

  return (
    <div className="col-xl-11 ml-4" style={{ width: "1000px", "overflow": "auto" }}>
      <div className="card-header" style={{ width: "3000px" }}>
        <h4 className=" col-xl-10 m-0 font-weight-bold text-primary"><BackupTableIcon fontSize="large" />&nbsp;{title}</h4>
      </div>

      <DragDropContext onDragEnd={manager.length != 0 && onDragEnd}>
        <div className="card-body" style={{ width: "3000px", height: "750px" }}>
          {/* 덱 생성하기 버튼 */}
          <CreateDeck setCreateResult={setCreateResult} />
          <Droppable
            droppableId="KanbanBoard"
            type="DECK"
            direction="horizontal"
            ignoreContainerClipping={false}
            isCombineEnabled={false}>
            {(provided) => (<Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  ml: 2, width: 300, height: 80
                }
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}>

              {decks.map((data, index) => {
                return (<Deck
                  no={data.no}
                  key={index}
                  deckTitle={data.title}
                  projectNo={projectNo}
                  index={index}
                  manager={manager}
                  deck={data}
                  cards={data.cards}
                />
                );
              })}
              {provided.placeholder}
            </Box>)}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
