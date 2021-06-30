import React from 'react';
import "./SplashNav.css"
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileDropDown"
import DemoUser from "../auth/DemoUser"


import { demoLogin} from "../../store/session";

function SplashNav() {
  let history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const handleDemo = async (e) => {
    e.preventDefault()
    await dispatch(demoLogin())
    history.push('/feed')
  }

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

            <div className="splash-demo" onClick={handleDemo}>
                  Demo
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
