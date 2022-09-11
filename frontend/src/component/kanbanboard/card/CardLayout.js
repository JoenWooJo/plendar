import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import './card.css';


const CardLayout = ({ taskCount, nCount, card, projectNo, deckNo, refresh, setRefresh}) => {

    const noSum = nCount.reduce((stack, el)=>{
        return stack + el;
    },0);

    const taskSum = taskCount.reduce((stack, el)=>{
        return stack + el;
    },0);

    //console.log("no sum", noSum);


    return (
        <div>
            <div className="card bg-light text-black shadow mb-2">
        {  taskSum == 0
            ? 
            <div className="card-body">
            <Card card={card} projectNo={projectNo} deckNo={deckNo} refresh={refresh} setRefresh={setRefresh}/>
            </div>
            :
            noSum == 0
            ?
            <div className="card-body" id="card-border">
            <Card card={card} projectNo={projectNo} deckNo={deckNo} refresh={refresh} setRefresh={setRefresh}/>
            </div>
            :
            <div className="card-body">
            <Card card={card} projectNo={projectNo} deckNo={deckNo} refresh={refresh} setRefresh={setRefresh}/>
            </div>
            
        }    
        </div>    
        </div>
    );
};

export default CardLayout;