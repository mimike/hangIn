import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadBox from './UploadBox';
import "./UploadModal.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
    //   style={{backgroundColor: "white", border:"none", fontSize:"1rem"}}
      onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadModal />
        </Modal>
      )}
    </>
  );
}

export default UploadModal;
