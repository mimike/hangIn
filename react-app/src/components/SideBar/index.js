import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom"
import "./SideBar.css"


function SideBar(){
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    return(
        <>
        <div className="side-bar">

            <li className="user-name">
                <div>
                    <img className="side-avatar-circle" src={user.avatar_url}/>
                </div>

                {user.first_name} {user.last_name}</li>
            <li>
                <i class="fab fa-facebook-messenger messenger" ></i>
                <span onClick={()=> {alert("future thing")}}>Messages</span>
            </li>

            <li>
                <i class="fas fa-walking walking"></i>
                <span onClick={()=> {alert("future thing")}}>Gigs</span>
            </li>

            <li>
                <i class="fas fa-user-friends friends" ></i>
                <span onClick={() => history.push("/feed")}>Connections</span>
            </li>
        </div>


        </>
    )
}
export default SideBar;
