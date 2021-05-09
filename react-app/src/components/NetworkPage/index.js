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
        <h1>Connections</h1>
        <h1>People u may know</h1>
        <ProfileTile/>
    </>
  );
}

export default NetworkPage;
