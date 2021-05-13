import React, { useState } from 'react';
import SearchResult from './SearchResult';
import {useDispatch, useSelector} from 'react-redux'
import {getSearchResult} from '../../store/search'
import "./Navigation.css";

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")

    const onSubmit = (e) => {
        setSearch(e.target.value)
        e.preventDefault()
        dispatch(getSearchResult(e.target.value));
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
        <input
            type="text"
            id="header-search"
            placeholder="Search"
            name="s"
            onChange={onSubmit}
            />
        </form>
        </div>
    </>
)
}
export default Search
