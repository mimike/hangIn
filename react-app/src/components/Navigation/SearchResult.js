import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
function SearchResult(){
    const [searchTerm, setSearchTerm] = useState("");
    const [showMenu, setShowMenu] = useState(true);
    const [user, setUser] = useState("");
    const [matchedUsers, setMatchedUsers] = useState([]);
    const users = useSelector(state => state.users)
    let onClick = (e) => {
        console.log('onClick')
        setSearchTerm(e.target.value)
        setShowMenu(false);
    }
    // useEffect( () => {
    //     if (searchTerm.length){
    //         setShowMenu(true)
    //     } else {setShowMenu(false)}
    //     console.log('useEffect')
    // }, [searchTerm])
    return (
        <>
            <div>
                {Object.values(users).filter((searchTerm) => {
                    if(user === ""){
                        return ""
                    } else if (searchTerm.first_name.toLowerCase().includes(user.toLowerCase())){
                        return searchTerm
                    }
                }).map((user) => {
                    return(
                    <div onClick={onClick} className="search-user" key={user.id}>
                        <NavLink to={`/user/${user.id}`} >{user.first_name} {user.last_name}</NavLink>
                    </div>
                    )
                })}
            </div>
        </>
    )
}
export default SearchResult;
