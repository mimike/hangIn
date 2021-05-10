import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { uploadPost } from "../../store/posts"
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import './UploadForm.css';
import { Modal } from '../../context/Modal';

const UploadForm = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("")
  const [textBody, setTextBody] = useState("")  //TEXTBODY
  const [photoCreated, setPhotoCreated] = useState()
  const [errors, setErrors] = useState([])
  
  //when u submit, the post will be in the database and  when u redirect to /feed the post should be in the feed.
  const handleSubmit = async (e) => {
    e.preventDefault();
   const submission = { mediaUrl, textBody }
   return dispatch(uploadPost(submission))
    history.push('/feed')
  }

  const updateMediaUrl = (e) => {
    setMediaUrl(e.target.files[0])
  }

  const updateTextBody = (e) => {
    setTextBody(e.target.value)
  }

// const onPost = async (e) => {
//     e.preventDefault();
//     const data = await dispatch(uploadPost(submission));
//     if (data.errors) {
//       setErrors(data.errors);
//     }
// };

    return (
      <>
        <form onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </ul> */}
          <h1>THE POST POPUP MODAL to post stuff!</h1>

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
                placeholder = "What do u wanna talk about?"
                onChange = {updateTextBody}
                />
          </div>

            {/* <div className="click-to-post">
              <button>Start post</button>
            </div> */}

          <button className="submit-button" type="submit">Poosst</button>
        </form>
      </>
    );
          };

  export default UploadForm;
