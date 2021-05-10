//component for the box u see at the top of the feed page, want to share something
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../store/posts"
import {useHistory} from 'react-router-dom'
import UploadModal from "../UploadFormModal";
import './UploadBox.css'

function UploadBox(){
  const dispatch= useDispatch()
  const user = useSelector(state => state.session.user)


    return (
        <>
          <div className="post-container">
            <div className="post-top">

              <img className="avatar-circle" alt="circle" src={user.avatar_url}/>
            </div>

            <div className="post-bottom">

            <UploadModal/>
            </div>


          </div>
        </>
    )
}
export default UploadBox;
