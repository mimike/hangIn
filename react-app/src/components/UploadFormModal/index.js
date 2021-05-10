import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import UploadBox from './UploadBox';
import "./UploadForm.css"
import UploadForm from "./UploadForm"
function UploadFormModal() {
  const [showModal, setShowModal] = useState(false);

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
