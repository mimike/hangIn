const SHOW_UPLOAD_FORM = "uploadForm/SHOW_UPLOAD_FORM"
const HIDE_UPLOAD_FORM = "uploadForm/HIDE_UPLOAD_FORM"

export const showUploadForm = () => ({
    type: SHOW_UPLOAD_FORM,

})

export const hideUploadForm = () => ({
    type: HIDE_UPLOAD_FORM,

})

const initialState = {showForm: false}

export default function uploadFormReducer(state = initialState, action){
    switch(action.type){
        case SHOW_UPLOAD_FORM:
            return {showForm: true}

        case HIDE_UPLOAD_FORM:
            return {showForm: false}
        default:
            return state
    }
}
