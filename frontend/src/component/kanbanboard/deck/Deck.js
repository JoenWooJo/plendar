import React from 'react';
import CreateCard from '../card/CreateCard';
import Card from '../card/Card';

const Deck = () => {
    return (
        <div className="card shadow col-xl-4 mb-4 mt-3">
            <div className=" row card-header py-3">
                <h5 className="col-xl-9 mt-2 font-weight-bold text-gray-dark">Doing </h5>
                <CreateCard/>
            </div>
            <div className="card-body">
                <Card/>
            </div>
        </div>

       
    );
};

export default Deck;