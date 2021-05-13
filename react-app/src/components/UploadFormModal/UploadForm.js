import React, { useState } from 'react';
import { uploadPost, getAllPosts } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import './UploadForm.css';
import UploadText from "./UploadText"
import { Modal } from '../../context/Modal';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';

//this is the modal box to submit
const UploadForm = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("")
  const [textBody, setTextBody] = useState("")  //TEXTBODY
  const [photoCreated, setPhotoCreated] = useState()
  const [errors, setErrors] = useState([])

  let close = document.getElementById("modal-background")

  const handleSubmit = async (e) => {
    e.preventDefault();
   const submission = { mediaUrl, textBody }

   const success = await dispatch(uploadPost(submission))
   if(success){
    dispatch(getAllPosts())
    close.click()
   }
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
        <div className="modal-container">
        <form className="upload-post-form" onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </ul> */}
          <div className="top-modal">
            <h1>Create a post</h1>
          </div>

          <div className="user-top">
            <div>
              <img className="avatar-circle" alt="profile circle" src={user.avatar_url}/>
            </div>
            <div className="profile-name">
              <p>{user.first_name} {user.last_name}</p>
            </div>
          </div>


          <div className="start-post-container">
                <textarea className="post2-box"
                type="text"
                value = {textBody}
                placeholder = "What do u wanna talk about?"
                onChange = {updateTextBody}
                />
          </div>

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
            onClick={() => setShowModal(true)}><i class="far fa-newspaper" ></i> Write article</label>

            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <UploadText />
              </Modal>
            )}
        </div>

          <button className="submit-button" type="submit">Post</button>
        </form>


        </div>
      </>
    );
          };

  export default UploadForm;
  // import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { uploadPost, getAllPosts } from "../../store/posts"
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory} from 'react-router-dom';
// import './UploadForm.css';
// import { Modal } from '../../context/Modal';

// const UploadForm = () => {
//   const history = useHistory()
//   const user = useSelector(state => state.session.user)
//   const dispatch = useDispatch()
//   const [showModal, setShowModal] = useState(false);
//   const [mediaUrl, setMediaUrl] = useState("")
//   const [textBody, setTextBody] = useState("")  //TEXTBODY
//   const [photoCreated, setPhotoCreated] = useState()
//   const [errors, setErrors] = useState([])

//   let close = document.getElementById("modal-background")

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//    const submission = { mediaUrl, textBody }

//    const success = await dispatch(uploadPost(submission))
//    if(success){
//     dispatch(getAllPosts())
//     close.click()
//    }
//     history.push('/feed')
//   }

//   const updateMediaUrl = (e) => {
//     setMediaUrl(e.target.files[0])
//   }

//   const updateTextBody = (e) => {
//     setTextBody(e.target.value)
//   }



// // const onPost = async (e) => {
// //     e.preventDefault();
// //     const data = await dispatch(uploadPost(submission));
// //     if (data.errors) {
// //       setErrors(data.errors);
// //     }
// // };

//     return (
//       <>

//         <div className="modal-container">
//         <form className="upload-post-form" onSubmit={handleSubmit}>
//           {/* <ul>
//             {errors.map((error) => (
//               <div>{error}</div>
//             ))}
//           </ul> */}
//           <div className="top-modal">
//             <h1>Create a post</h1>
//           </div>

//           <div>
//             <img className="avatar-circle" alt="profile circle" src={user.avatar_url}/>
//           </div>
//           <div className="profile-name">
//             <p>{user.first_name} {user.last_name}</p>
//           </div>

//           <div className="start-post-container">
//                 <textarea className="post-box"
//                 type="text"
//                 value = {textBody}
//                 placeholder = "What do u wanna talk about?"
//                 onChange = {updateTextBody}
//                 />
//           </div>

//           <div className="upload-image-box">
//               <label className="upload-label" htmlFor="file"><i class="far fa-images" ></i> Upload</label>
//                   <input
//                   id = "file"
//                   className="input-file"
//                   name = "image"
//                   type = "file"
//                   onChange = {updateMediaUrl}
//                   />
//           </div>



//             {/* <div className="click-to-post">
//               <button>Start post</button>
//             </div> */}

//           <button className="submit-button" type="submit">Post</button>

//         </form>
//         </div>
//       </>
//     );
//           };

//   export default UploadForm;
