import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { uploadPost, getAllPosts } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import './UploadForm.css';
//import { Modal } from '../../context/Modal';
import { Editor, convertFromRaw, convertToRaw } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const UploadText = () => {
    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState(
                () => EditorState.createEmpty(),
            )
            const  [convertedContent, setConvertedContent] = useState(null);

            const handleEditorChange = (state) => {
              setEditorState(state);
              convertContentToHTML();
            }

            const convertContentToHTML = () => {
              let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
              setConvertedContent(currentContentAsHTML);
            }
            const createMarkup = (html) => {
              return  {
                __html: DOMPurify.sanitize(html)
              }
            }
            const handleSubmit = (e) => {
                e.preventDefault()
                const convertedData = convertToRaw(editorState.getCurrentContent())
                dispatch(uploadPost(convertedData))


              }




    return (
        <>
            <h1>Headline</h1>
            <div className="app">
                <header className="app-header">
                Write stuff here
                </header>
                <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                />
                <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>

                <div id="comment-button-div">
            <button onClick={handleSubmit} id="comment-submit-button" color="teal">Submit</button>
          </div>

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
