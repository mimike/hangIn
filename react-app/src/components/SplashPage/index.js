import React from 'react';
import "./SplashPage.css"
import splash from "../../images/ffp.jpg"
import LogoutButton from '../auth/LogoutButton'
//import Navigation from '../Navigation'

function SplashPage() {
  return (
    <>
      {/* <Navigation /> */}
      <div>
        <img alt="splash" src={splash}></img>
        <h1>Hang <i class="fab fa-linkedin"></i></h1>
        <h1>
          Welcome to your <br/>aerial community
        </h1>
      </div>
      <LogoutButton/>
    </>
  );
}

export default SplashPage;
