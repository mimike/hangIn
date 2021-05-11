import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Comments from "../../components/Comments"

function CommentsBoxModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className=".post-container">
        <div className="post-box">
          <button

          onClick={() => setShowModal(true)}></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <Comments />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentsBoxModal;
