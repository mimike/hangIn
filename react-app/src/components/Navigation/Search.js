import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
// import {useHistory} from 'react-router-dom'
import {searchUserThunk} from '../../store/search'
import "./Navigation.css";
import SearchResult from "./SearchResult.js"

const Search = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [search, setSearch] = useState("")

    const onType = (e) => {
        setSearch(e.target.value)
        e.preventDefault()
        // dispatch(getSearchResult(e.target.value));
        dispatch(searchUserThunk(e.target.value))

    }
return (
    <>
        <div className="nav-bar-container">
         <li>
            <a>
             <i class="fab fa-linkedin" ></i>
            </a>
        </li>

        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
        <div className="search-field">
            <input
                type="text"
                autoComplete="off"
                id="header-search"
                placeholder="Search"
                value = {search}
                name="s"
                onChange={onType}
                />
        </div>
        {/* <button type="submit">Search</button> */}
        <SearchResult search={search}/>
        </form>
        </div>
    </>
)
}
export default Search;
