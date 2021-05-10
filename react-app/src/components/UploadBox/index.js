//component for the box u see at the top of the feed page, want to share something
import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { uploadPost } from "../../store/posts"
import {useHistory} from 'react-router-dom'
import UploadModal from "../UploadFormModal";
import './UploadBox.css'

function UploadBox(){


    return (
        <>
          <div className="post-container">
            <div className="post-top">
              <h2>My avatar</h2>
            </div>

            <div className="post-bottom">
              <h2>Start post, when u click here a modal will pop up!</h2>
            </div>

            <UploadModal/>

          </div>
        </>
    )
}
export default UploadBox;
