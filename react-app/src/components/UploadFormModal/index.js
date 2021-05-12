import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import UploadBox from './UploadBox';
import {  useSelector } from "react-redux";
import { uploadPost } from "../../store/posts"
import "./UploadForm.css"
import UploadForm from "./UploadForm"
import "./UploadForm.css"
function UploadFormModal() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user)

  return (
    <>

      <div className=".post-container">
        <div className="post-box">
          <button
          onClick={() => setShowModal(true)}>Start a post...</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UploadForm />
            </Modal>
          )}
        </div>
      </div>

    </>
  );
}

export default UploadFormModal;
