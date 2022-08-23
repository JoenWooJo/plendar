import React from 'react';

import SiteLayout from '../../layout/SiteLayout';
import CreateDeck from './deck/CreateDeck';
import Deck from './deck/Deck';

const Kanban = () => {
    return (
        <SiteLayout>
        <div className="col-xl-11 ml-4">
          <div className="card shadow mb-4">
            <div className="card-header1 py-3">
              <h6 className="m-0 font-weight-bold text-light"> plendar project kanban</h6>
            </div>
            <div className="card-body">
              <CreateDeck />
              <Deck/>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
};

export default Kanban;