import React from 'react';
import "./SplashNav.css"
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileDropDown"

function SplashNav() {
  const user = useSelector(state => state.session.user)

  function isLoggedIn(){
    if(!user){
      return (
        <>
          <div className="splash-btn-container">

            <div className="splash-login">
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>

            <div className="splash-sign-up">
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>

          </div>
        </>
     )

    }
  }

  function isLoggedOut(){
    if(user){
      return(
        <>
          <div className="splash-profile">
            <ProfileButton user={user}/>
          </div>
        </>
      )
    }
  }
  return (
    <>
      {isLoggedIn()}
      {isLoggedOut()}
    </>
  )

}
export default SplashNav;
