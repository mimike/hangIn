import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import UploadBox from './UploadBox';


import "./UploadForm.css"
import UploadForm from "./UploadForm"
import "./UploadForm.css"

function UploadFormModal() {

  const [showModal, setShowModal] = useState(false);
  // const user = useSelector(state => state.session.user)

  return (
    <>

      <div className=".post-container">
        <div className="post-box">
          <button
          onClick={() => setShowModal(true)}>What's on your mind?</button>
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
