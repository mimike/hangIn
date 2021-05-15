import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getSearchResult} from '../../store/search'
import "./Navigation.css";
import SearchResult from "./SearchResult.js"

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState("")

    const onType = (e) => {
        setSearch(e.target.value)
        e.preventDefault()
        // dispatch(getSearchResult(e.target.value));
        history.push('/feed')
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
                id="header-search"
                placeholder="Search!!"
                value = {search}
                name="s"
            onChange={onType}
                />
        </div>
        <SearchResult/>
        </form>
        </div>
    </>
)
}
export default Search;
