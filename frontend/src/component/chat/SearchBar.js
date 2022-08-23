import React from 'react';

// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
import SearchIcon from '@mui/icons-material/Search';
import '../../assets/css/bar.css';


const SearchBar = ({ roomList }) => {
    const searchRoom = (e) => {
        console.log("search: ",e.target.value);
        // let searchText = e.target.value;
        // roomList.filter((room)=> {
        //     if (searchText == "") {
        //         return room
        //     } else if (room.title.toLowerCase().includes(searchText.toLowerCase())) {
        //         return ""
        //     }
        // })
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