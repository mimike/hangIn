import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Feed from "../../components/Feed"
import "./CommentsBoxModal.css"
// import Test from "../../components/Test"

function CommentsBoxModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className=".all-comments-container">
        <div className="all-comments-box">
          {/* <button className="post-box"
          onClick={() => setShowModal(true)}>Add a comment!</button> */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>

            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentsBoxModal;
