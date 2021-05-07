const UPLOAD_POST = "posts/UPLOAD_POST"
const DISPLAY_POSTS = "posts/DISPLAY_POSTS"

const createPost = () => {

}

const displayPost = () => {

}

export const uploadPost = (submission) => async (dispatch) =>{
    const { mediaUrl, bodyText } = submission  //textbody!

    const formData = new FormData()
    formData.append("textBody", bodyText)
    if (mediaUrl){
        formData.append("mediaUrl", mediaUrl)
    }
    console.log("!!!!", submission)
    const res = await fetch("/api/posts", {
        method: "POST",
        body: formData
    })
}
