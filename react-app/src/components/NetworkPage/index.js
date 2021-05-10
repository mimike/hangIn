import React, {useEffect} from 'react';
import "./NetworkPage.css";
import ProfileTile from "./ProfileTile";
import {getUsersThunk} from "../../store/users";
import {useDispatch} from 'react-redux';

function NetworkPage() {
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log("WEGOTTOHEREEEEELKkdfjlsfdjasl")
    dispatch(getUsersThunk())
  }, [dispatch])   //dependancy array {}
  return (
    <>

      
        <div className="people">
          <h2>People you may know</h2>
        </div>

        <ProfileTile/>
    </>
  );
}

export default NetworkPage;
