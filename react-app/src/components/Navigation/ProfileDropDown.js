import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import { logout } from "../../store/session";

import "./Navigation.css"

function ProfileButton() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    // const sessionUser = useSelector(state => state.session.user)

    //const targetUser = useSelector(state => state.session.user) //target user
    const [showMenu, setShowMenu] = useState(false);  // setting the menu showing to false "closed"

    // function to open the menu
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    // close the menu
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return (() => document.removeEventListener('click', closeMenu))
    }, [showMenu]);
    //before it fires, checks the dependency array, showMenu.

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
      };

    return (
        <>
            <div className="drop-down">
              <button className="profile-button"  onClick={openMenu}>

              <img src={user?.avatar_url}/>
              </button>
            </div>
            {showMenu && (
                <button className="profile-dropdown">
                    {/* <div>{user.firstName}!</div>
                    <div>{user.headline}</div> */}

                <div className="drop-down-links">

                  <div>
                    <li>
                      <Link className="view-profile" onClick={() => history.push('/profile')} style={{textDecoration:"none", color:"white", fontWeight:"bold"}}>View Profile</Link>
                    </li>

                    <li>
                      <Link className="view-profile" onClick={() => history.push('/feed')} style={{textDecoration:"none", color:"white", fontWeight:"bold"}}>Home </Link>
                    </li>

                  </div>
                </div>

                <div className="log-out-drop-down-links">
                  <div>
                    <li>
                      <Link className="sign-out-dropdown" onClick={logout} style={{textDecoration:"none", color:"white"}}>Sign out</Link>
                    </li>
                  </div>
                </div>
              </button>

            )}
        </>
    )
}

export default ProfileButton;
