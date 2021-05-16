import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import "./SideBar.css"


function SideBar(){
    const user = useSelector(state => state.session.user)
    return (
        <>
        <div className="side-bar">

            <li className="user-name">
                <div>
                    <img className="side-avatar-circle" src={user.avatar_url}/>
                </div>

                {user.first_name} {user.last_name}</li>
            <li>
                <i class="fab fa-facebook-messenger messenger" ></i>
                <span>Messages</span>
            </li>

            <li>
                <i class="fas fa-walking walking"></i>
                <span>Gigs</span>
            </li>

            <li><i class="fas fa-user-friends friends" ></i> Connections</li>
        </div>


        </>
    )
}
export default SideBar;
