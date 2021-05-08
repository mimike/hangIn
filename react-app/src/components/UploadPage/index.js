import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uploadPost } from "../../store/posts"

import {useHistory} from 'react-router-dom'
import './UploadPage.css'

function UploadPage(){
    let history = useHistory()
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)

    const [mediaUrl, setMediaUrl] = useState("")
    const [textBody, setTextBody] = useState("")  //TEXTBODY
    const [photoCreated, setPhotoCreated] = useState()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const submission = { mediaUrl, textBody }
      let createdPhoto = await dispatch(uploadPost(submission))
      // return alert('Post Created!')
      history.push('/profile')
    }

    const updateMediaUrl = (e) => {
      setMediaUrl(e.target.files[0])
    }
    const updatetextBody = (e) => {
      setTextBody(e.target.value)
    }

    return (
        <>
        <form className="new-post-container">
        {/* <img className="profile-button" alt="profile pic" src={sessionUser.avatar_url}></img> */}

          <div className="upload-image-box">
            <label className="upload-label" htmlFor="file"><i class="far fa-images" ></i></label>
                <input
                id = "file"
                className="input-file"
                name = "image"
                type = "file"
                onChange = {updateMediaUrl}
                />
            </div>

            <div className="start-post-container">
              <textarea className="post-box"
              type="text"
              value = {textBody}
              placeholder = "Start a post"
              onChange = {updatetextBody}
              />
            </div>

            <button onClick={handleSubmit} className="submit-post"type="submit">Post</button>

        </form>
        </>
    )
}
export default UploadPage;
