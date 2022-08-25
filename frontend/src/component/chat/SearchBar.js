import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import '../../assets/css/bar.css';


const SearchBar = ({ roomList, setNewRoomList }) => {

    const searchRoom = (e) => {
        setNewRoomList(roomList.filter((room)=> {
            if (e.target.value == "") {
                return room
            } else if (room.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                return room
            }
        }))
    };

    return (
        <div className="input-group rounded mb-3">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" onChange={(e) => searchRoom(e)} />
            <span className="input-group-text border-0" id="search-addon">
                    <SearchIcon/>
            </span>
        </div>
    );
};

export default SearchBar;