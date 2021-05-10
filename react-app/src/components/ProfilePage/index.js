import React from 'react';
import "./ProfilePage.css"
import ProfileTile from "../NetworkPage/ProfileTile"
import "./ProfilePage.css"
import cover from "../../images/mimicover.jpeg"
import pic from "../../../src/images/profilepic.jpg"
import {getUsersThunk} from "../../store/users"
import {useDispatch, useSelector} from "react-redux";

const ProfilePage = () => {
  return (
    <>
      <div className="profile-page-container">
        <div className="first-container">
            <div className="cover-container">
                <img className="cover-pic1"  src={cover}/>
                <img className="avatar-pic1" src={pic}/>
            </div>
            <div className="profile-text1">
                <h3 className="my-name">Mimi Ke</h3>
                <h3 className="my-headline">Dancer | Aerialist National Dance Academy</h3>
            <div className="my-location">
              <h3>Iowa City, Iowa United States</h3>
            </div>
        </div>

        </div>
        <div className="middle-container">
            <div className="about-container">
              <h4>About</h4>
              <h5>My desire to create is what drove me to become a software developer. I love the process of conceptualizing an idea and using technology to engineer a solution. I have experience building dynamic, modern websites using Javascript, Python, React, Redux, Express, Flask-SQLAlchemy, HTML, and CSS.
                <h5>
                  Main Discipline: Fabric
                </h5>

                <h5>
                  Circus Minors: Rope, Hoop, Invented Apparatus, Rope and harness, Bungee, Low-Flying Trapeze
                </h5>

                <h5>
                  Other: Coding, Collaborating, Crashing
                </h5>
              </h5>
            </div>

        </div>
        <div className="last-container">
          <h4>Experience</h4>
          <h5>As a Portfolio Analyst, it was my job to work closely with project managers and keep track of financial information and the status of projects. I met regularly with three project managers and reviewed project plans, analyzed possible risks a project might have, and submitted projects for approval to the program manager.</h5>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
