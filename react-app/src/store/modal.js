const SHOW_UPLOAD_FORM = "uploadForm/SHOW_UPLOAD_FORM"
const HIDE_UPLOAD_FORM = "uploadForm/HIDE_UPLOAD_FORM"
const SHOW_MESSENGER = "uploadForm/SHOW_MESSENGER"
const HIDE_MESSENGER = "uploadForm/HIDE_"

export const showUploadForm = () => ({
    type: SHOW_UPLOAD_FORM,

})
export const hideUploadForm = () => ({
    type: HIDE_UPLOAD_FORM,

})


const initialState = {showUploadForm: false}

export default function modalReducer(state = initialState, action){
    switch(action.type){
        case SHOW_UPLOAD_FORM:
            return {showUploadForm: true}

        case HIDE_UPLOAD_FORM:
            return {showUploadForm: false}
        //case SHOW MESSSAGING

        //case HIDE MESSAGING
        default:
            return state
    }
}
