import React, {useEffect} from 'react';
import "./NetworkPage.css";
import ProfileTile from "./ProfileTile";
import {getUsersThunk} from "../../store/users";
import {useDispatch} from 'react-redux';
import SideBar from "../../components/SideBar"
import "../SideBar/SideBar.css"

function NetworkPage() {
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log("WEGOTTOHEREEEEELKkdfjlsfdjasl")
    dispatch(getUsersThunk())
  }, [dispatch])   //dependancy array {}
  return (
    <>
      <div className="page-container">
        <div className="left-container">
          <SideBar />
        </div>

        <div className="main-container">
          <div className="people">
            <h2>People you may know</h2>
          </div>

          <div>
            <ProfileTile/>
          </div>
        </div>
      </div>

    </>
  );
}

export default NetworkPage;
