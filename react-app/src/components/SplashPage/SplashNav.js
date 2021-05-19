import React from 'react';
import "./SplashNav.css"
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';

function SplashNav() {
  // const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks=(

  //   )
  // }
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
