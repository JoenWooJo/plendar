import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import '../../assets/css/bar.css';



const SearchBar = ({ roomList, setNewRoomList }) => {
    const [word, setWord] = useState("");
    const searchRoom = (e) => {
        console.log("change: ", e.target.value);
        word != "" && e.target.value == "" && setNewRoomList(roomList);
    };

    const searchEnter = (e) => {
        if(e.key == "Enter") {
            console.log(e.target.value);
            const searchResult = roomList.filter((room)=> {
                if (e.target.value == "") {
                    return room
                } else if (room.title.includes(e.target.value)) {
                    return room
                } else if (room.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return room
                } 
                })
            setWord(e.target.value);
            setNewRoomList(searchResult);
        } 
    };

    return (
        <div className="input-group rounded mb-3">
            <input type="search" className="form-control rounded" placeholder="Search"
                aria-describedby="search-addon" onChange={(e) => searchRoom(e)} onKeyDown={(e)=>{searchEnter(e)}} style={{fontFamily: "IBMPlexSansKR-Regular"}}/>
            <span className="input-group-text border-0" id="search-addon">
                <SearchIcon/>
            </span>
        </div>
    );
};

export default SearchBar;