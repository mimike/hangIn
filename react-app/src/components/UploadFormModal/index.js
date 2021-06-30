import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector} from 'react-redux'

import {showUploadForm, hideUploadForm} from "../../store/modal"
import UploadModal from "../UploadFormModal";
import "./UploadForm.css"
import UploadForm from "./UploadForm"
import "./UploadForm.css"

function UploadFormModal() {
  const dispatch = useDispatch()
  const formStatus = useSelector(state => state.modal.showUploadForm)
  //true or false. starts as false, when u call showUpload form, state = true.
  // when u calle hideUploadForm, state = false;

  // const handleForm = function(){
  //   setShowModal(true);
  //   dispatch(showUploadForm());
  // }

  return (
    <>

      <div className=".post-container">
        <div className="post-box">
          <button
          onClick={() => dispatch(showUploadForm())}>What's on your mind?</button>
          {formStatus && (
            <Modal onClose={() => dispatch(hideUploadForm())}>
              <UploadForm />
            </Modal>
          )}
        </div>
      </div>


    </>
  );
}

export default UploadFormModal;


// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import UploadText from './UploadText';


// import "./UploadForm.css"
// import UploadForm from "./UploadForm"
// import "./UploadForm.css"

// function UploadFormModal() {

//   const [showModal, setShowModal] = useState(false);
//   // const user = useSelector(state => state.session.user)

//   return (
//     <>

//       <div className=".post-container">
//         <div className="post-box">
//           <button
//           onClick={() => setShowModal(true)}>Start a post...</button>
//           {showModal && (
//             <Modal onClose={() => setShowModal(false)}>
//               <UploadForm />
//             </Modal>
//           )}
//         </div>
//       </div>

//       {/* <div className=".post-container">
//         <div className="post-box">
//           <button
//           onClick={() => setShowModal(true)}>Start an essay...</button>
//           {showModal && (
//             <Modal onClose={() => setShowModal(false)}>
//               <UploadText />
//             </Modal>
//           )}
//         </div>
//       </div> */}

//     </>
//   );
// }

// export default UploadFormModal;
