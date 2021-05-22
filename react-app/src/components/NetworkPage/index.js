import React, {useEffect, useState} from 'react';
import "./NetworkPage.css";
import ProfileTile from "./ProfileTile";
import {getUsersThunk} from "../../store/users";
import {useDispatch} from 'react-redux';
import SideBar from "../../components/SideBar"
import "../SideBar/SideBar.css"

function NetworkPage() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);

  useEffect(()=> {

    dispatch(getUsersThunk()).then(() => {
      setLoaded(false);

    })
  }, [dispatch])   //dependancy array {}
  if(loaded){
    return <div><h4><i class="far fa-clock"></i> loading...</h4></div>
  }
  return (
    <>
      <div className="page-container">
        <div className="left-container">
          <SideBar />
        </div>

        <div className="main-container">


          <div className="network-container">
          <div className="people">
            <h2>People you may know</h2>
          </div>
            <ProfileTile/>
          </div>
        </div>
      </div>

    </>
  );
}

export default NetworkPage;
