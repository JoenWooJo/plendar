import React, { useState, useEffect } from 'react';
import SiteLayout from '../../layout/SiteLayout';
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck'; 
import { useParams } from 'react-router';
import { get } from '../../api/Axios';


const Kanban = () => {
  const params = useParams();
  const [deckList, setDeckLlist] = useState([]);
  const projectNo = params.no;
  const [createResult, setCreateResult] = useState(false);

  useEffect(()=>{
    t();
  }, [createResult])

  // 덱 리스트 가져오기
 const t = async() => {    
  const list = await get(`/kanban/deck/find/${projectNo}`);
  setDeckLlist(list);
 }
  return (
    <SiteLayout>
      <div className="col-xl-11 ml-4">
        <div className="card shadow mb-4">
          <div className="card-header1 py-3">
            <h6 className="m-0 font-weight-bold text-light"> plendar project kanban</h6>
          </div>
          <div className="card-body" style={{ height: "750px", overflow:"auto"}}>
          
            <CreateDeck setCreateResult={setCreateResult}/>
            <div className="row">
              {
                deckList.map((m, i) => {
                  return (
                    <Deck
                      no={m.no}
                      key={i}
                      title={m.title}
                      projectNo={projectNo}
                      setCreateResult={setCreateResult}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Kanban;
