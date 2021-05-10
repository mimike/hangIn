const UPLOAD_POST = "posts/UPLOAD_POST"
const DISPLAY_POSTS = "posts/DISPLAY_POSTS"

const createPost = (submission) => ({
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

    console.log("!!!!", submission)
    const res = await fetch("/api/posts", {
        method: "POST",
        body: formData
    })
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

export default function postsReducers(state = {}, action) {
    switch (action.type) {
        case UPLOAD_POST:
            //////////DO!!!!!!
            return action.payload;
        case DISPLAY_POSTS:
            const postsPayload = action.payload
            const newPosts = {}
            for (const post of postsPayload.posts){
                newPosts[post.id] = post
            }
            return newPosts
        default:
            return state;
    }
}
