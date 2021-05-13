//component for the box u see at the top of the feed page, want to share something
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal';
import UploadText from "../UploadFormModal/UploadText"
import { uploadPost } from "../../store/posts"
import {useHistory} from 'react-router-dom'
import UploadModal from "../UploadFormModal";
import './UploadBox.css'
import '../UploadFormModal/UploadForm.css'

function UploadBox(){
  const dispatch= useDispatch()
  const user = useSelector(state => state.session.user)

  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("")
  const updateMediaUrl = (e) => {
    setMediaUrl(e.target.files[0])
  }

    return (
        <>
          <div className="post-container">
            <div className="post-top">
              <img className="avatar-circle" alt="circle" src={user.avatar_url}/>

              <div className="post-bottom">
            <UploadModal/>
            </div>
            </div>


            <div className="icon-container">

            <div className="upload-image-box">
              <label className="upload-post-label" htmlFor="file"><i class="far fa-images" ></i> Photo</label>
                  <input
                  id = "file"
                  className="input-file"
                  name = "image"
                  type = "file"
                  onChange = {updateMediaUrl}
                  />
            </div>

          <div className="share-story">
              <label
              onClick={() => setShowModal(true)}><i class="far fa-newspaper" ></i> Share Story</label>

            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <UploadText />
              </Modal>
            )}
          </div>
          </div>
        </div>
    </>
    )
}
export default UploadBox;
