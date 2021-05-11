const UPLOAD_POST = "posts/UPLOAD_POST"
const DISPLAY_POSTS = "posts/DISPLAY_POSTS"

const createPost = (submission) => ({  //not calling this
    type: UPLOAD_POST,
    payload: submission
})

const displayPosts = (posts) => ({
    type: DISPLAY_POSTS,
    payload: posts
})

export const uploadPost = (submission) => async (dispatch) =>{
    const { mediaUrl, textBody } = submission  //textbody!

    const formData = new FormData()
    formData.append("textBody", textBody)
    //formData.append("mediaUrl", mediaUrl)
    if (mediaUrl){
        formData.append("mediaUrl", mediaUrl)
    }
    const res = await fetch("/api/posts", {
        method: "POST",
        body: formData
    })
    return true;

}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: "GET",
    });
    if (response.ok) {
        const posts = await response.json();
        dispatch(displayPosts(posts))
        return posts
    }
}
export const getAllUserPosts = () => async dispatch => {
    const response = await fetch ('api/posts/user/:id', )
}
//?
export const likePost = (params) => async dispatch => {
    const { post_id} = params;
    const response = await fetch (`api/posts/${post_id}/like`, {
        method: "POST",
    })
    const data = await response.json()
}
//?
export const unlikePost = (params) => async dispatch => {
    const { like_id} = params; //????
    const response = await fetch (`api/posts/like/${like_id}`, {
        method: "DELETE",
    })
    const data = await response.json()
    return
}
//add a comment
export const commentPost = (submission) => async dispatch => {
    console.log("!!", submission)
    // const {postId} = submissions
    // const formData = new FormData()
    // formData.append("commentText", commentText)
    // // console.log("Df!!")
    // formData.append("postId", post_id)
    const res = await fetch(`/api/posts/${submission.postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submission)  // we send this to backend route it gets commited

    })

    const data = await res.json()
    return //? u have to return
}


const initialState = {}
export default function postsReducers(posts = initialState, action) {
    switch (action.type) {
        case UPLOAD_POST:

            const postPayload = action.payload
            const newPosts = {...posts}  //...we dont want to get rid of other posts
            newPosts[postPayload.id] = postPayload
            return newPosts

        case DISPLAY_POSTS:
            const postsPayload = action.payload
            const newAllPosts = {}
            for (const post of postsPayload.posts){
                newAllPosts[post.id] = post
            }
            return newAllPosts
        default:
            return posts;
    }
}
