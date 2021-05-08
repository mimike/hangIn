import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import { logout } from "../../store/session";
import pic from "../../../src/images/profilepic.jpg"
import "./Navigation.css"

function ProfileButton() {
    const history = useHistory();
    const dispatch = useDispatch();
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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };

    return (
        <>
            <div className="drop-down">
              <button className="profile-button"  onClick={openMenu}>
              <img alt="temporary photo" src={pic}/>
              </button>
            </div>
            {showMenu && (
                <button className="profile-dropdown">
                    {/* <div>{user.firstName}!</div>
                    <div>{user.headline}</div> */}

                <div className="drop-down-links">

                  <div>
                    <Link onClick={() => history.push('/profile')} style={{textDecoration:"none", color:"black", fontWeight:"bold"}}>View Profile</Link>
                  </div>

                </div>
                <div className="log-out-drop-down-links">
                  <div>
                    <Link onClick={logout} style={{textDecoration:"none", color:"black"}}>Sign out</Link>
                  </div>
                </div>
              </button>

            )}
        </>
    )
}

export default ProfileButton;
