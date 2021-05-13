import React, { useState } from 'react';

import { uploadPost, getAllPosts } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import './UploadForm.css';
import { Modal } from '../../context/Modal';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';


const UploadText = () => {

    const [editorState, setEditorState] = useState(
                () => EditorState.createEmpty(),
            )

    return (
        <>
            <h1>modal</h1>
            <div className="app">
                <header className="app-header">
                Rich Text Editor Example
                </header>
                <Editor editorState={editorState} />
            </div>
        </>
    )
}
export default UploadText;
//   export default UploadTextModal

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from 'draft-js';
// import React, { useState } from 'react';


// function UploadTextForm(){
//     const [editorState, setEditorState] = useState(
//         () => EditorState.createEmpty(),
//     )

//     return (
//         <>
//             <div className="app">
//             <header className="app-header">
//             Rich Text Editor Example
//             </header>
//             <Editor editorState={editorState} />
//             </div>

//         </>
//     )
// }
// export default UploadTextForm;
