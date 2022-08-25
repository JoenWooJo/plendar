import React, { useState, useEffect } from 'react';

import SiteLayout from '../../layout/SiteLayout';
import axios from 'axios';
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck'; 
import { useParams } from 'react-router';


const Kanban = () => {
  const params = useParams();
  const [deckList, setDeckLlist] = useState([]);
  const projectNo = params.no;

  useEffect(() => {
    console.log("params: ",projectNo)
    axios.get('/api/kanban/deck/find',{
      params:{
      projectNo:projectNo
    }}).then((resp) => {
        const list = resp.data.data;
        setDeckLlist(list);
        console.log(list);
      })
  }, []);

  return (
    <SiteLayout>
      <div className="col-xl-11 ml-4">
        <div className="card shadow mb-4">
          <div className="card-header1 py-3">
            <h6 className="m-0 font-weight-bold text-light"> plendar project kanban</h6>
          </div>
          <div className="card-body">
            <CreateDeck />
            <div className="row">
              {
                deckList.map((m, i) => {
                  return (
                    <Deck
                      key={i}
                      title={m.title}
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
