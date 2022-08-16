import React from 'react';

// import '../../assets/css/mdb.dark.min.css';
// import '../../assets/css/mdb.dark.rtl.min.css';
// import '../../assets/css/mdb.min.css';
// import '../../assets/css/mdb.rtl.min.css';
import '../../assets/css/bar.css';


const SearchBar = () => {
    return (
        <div className="input-group rounded mb-3">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
                <img src="/images/search.png" style={{ width: '30px'}}/>
            </span>
        </div>
    );
};

export default SearchBar;