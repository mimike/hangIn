import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import "./Navigation.css"
import "./SearchResult.css"

function SearchResult({search, setSearch}){  // setSearch prop so search bar clears after enter
    const [searchTerm, setSearchTerm] = useState("");
    const searched_users = useSelector(state => state.search.search) || {}; 
    const searches = searched_users.users || {}
    const [showMenu, setShowMenu] = useState(true);

    let onClick = (e) => {
        setSearchTerm(e.target.value)
        setShowMenu(false);
        setSearch("");  //wiping the slate after user clicks enter
    }

    let searchResult = null;
    if (showMenu && Object.values(searches).length) {
        searchResult =
        <div onClick={onClick} className="parent-list">
            <ul className="search-result">
                {Object.values(searches).map(search => (
                    <li key={search.id} className="one-list">
                        <NavLink to={`/user/${search.id}`} exact={true}>
                            <div className="one-user">
                                <div>
                                    <img className="avatar-circle-search" src={search.avatar_url} />
                                </div>
                                <div className="username">
                                    <div className="username-searched">{search.first_name} {search.last_name } </div>
                                </div>
                                <span>  {'\u2022'} {search.skills}</span>
                                <span>  {'\u2022'} {search.headline}</span>
                                <span> {'\u2022'} {search.city}, {search.state}</span>
                            </div>

                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    }

    const [user, setUser] = useState("");
    const [matchedUsers, setMatchedUsers] = useState([]);
    const users = useSelector(state => state.users);

    //only show the drop down if there is a searchTerm
    useEffect( () => {
        if (search.length){
            setShowMenu(true)
        } else {setShowMenu(false)}

    }, [search])

    return (
        <>
            {searchResult}
        </>

    )
}
export default SearchResult;
//  {/* <div>
//                 {Object.values(users).filter((searchTerm) => {
//                     if(user === ""){
//                         return ""
//                     } else if (searchTerm.first_name.toLowerCase().includes(user.toLowerCase())){
//                         return searchTerm
//                     }
//                 }).map((user) => {
//                     return(
//                     <div onClick={onClick} className="search-user" key={user.id}>
//                         <NavLink to={`/user/${user.id}`} >{user.first_name} {user.last_name}</NavLink>
//                     </div>
//                     )
//                 })}
//             </div> */}
