import React from 'react';
import {useSelector} from 'react-redux';
import "./SplashPage.css"
import ProfileDropDown from "../Navigation/ProfileDropDown"

import splash from "../../images/photohang.jpeg"
import SplashNav from "./SplashNav"


function SplashPage() {
  const user = useSelector(state =>  state.session.user)
  let links;
  if(user){
    links= (
      <ProfileDropDown/>
    )
  } else {
    links=(
      <SplashNav/>
    )
  }

  return (
    <>
      <SplashNav/>
      <div className="splash-container">
        <div className="splash-text">
          <h1>Hang <i class="fab fa-linkedin"></i></h1>
          <h3>Welcome to your <br/>aerial community</h3>
        </div>
        <img className="splash-photo" alt="splash" src={splash}></img>
      </div>

    </>
  );
}

export default SplashPage;
