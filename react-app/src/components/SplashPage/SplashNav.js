import React from 'react';
import "./SplashNav.css"
import { NavLink } from 'react-router-dom';

function SplashNav() {
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
export default SplashNav;
