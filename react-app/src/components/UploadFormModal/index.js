import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector} from 'react-redux'

import {showUploadForm, hideUploadForm} from "../../store/modal"
import "./UploadForm.css"
import UploadForm from "./UploadForm"
import "./UploadForm.css"

function UploadFormModal() {
  const dispatch = useDispatch()
  const formStatus = useSelector(state => state.modal.showUploadForm)

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
