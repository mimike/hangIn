import {userLikePost, userUnlikePost } from "./session"

const UPLOAD_POST = "posts/UPLOAD_POST"
const DISPLAY_POSTS = "posts/DISPLAY_POSTS"

const ADD_LIKE = "posts/ADD_LIKE"
const REMOVE_LIKE = "posts/REMOVE_LIKE"
const SET_LIKES = "posts/SET_LIKES"

const createPost = (submission) => ({  //not calling this
    type: UPLOAD_POST,
    payload: submission
})
const displayPosts = (posts) => ({
    type: DISPLAY_POSTS,
    payload: posts
})
const addLike = (postId) => ({
    type: ADD_LIKE,
    payload: postId
})
const removeLike = (postId) => ({
    type: REMOVE_LIKE,
    payload: postId
})
const setLikes = (info) => ({
    type: SET_LIKES,
    payload: info
})

export const uploadPost = (submission) => async (dispatch) =>{
    const { mediaUrl, textBody } = submission  //textbody!

    const formData = new FormData()
    formData.append("textBody", textBody)
    //formData.append("mediaUrl", mediaUrl)
    if (mediaUrl){
        formData.append("mediaUrl", mediaUrl)
    }
    const res = await fetch("/api/posts/", {
        method: "POST",
        body: formData
    })
    if(res.ok){
        dispatch(createPost(submission))
    }
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

export const getPostLikes = (post_id) => async dispatch => {
    const response = await fetch (`api/posts/${post_id}`)
        // headers: { 'Content-Type': 'application/json'}
    if (response.ok){
        const likes = await response.json()
        dispatch(setLikes(likes))
    }
}
export const likePost = (post_id) => async dispatch => {

    const response = await fetch ('/api/posts/like', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            post_id
        })
    })

    const data = await response.json()
    if(response.ok){
        await dispatch(userLikePost(data.post_id))
        await dispatch(addLike(data.post_id))
        return true;
    }
}
export const unlikePost = (post_id) => async dispatch => {

    const response = await fetch ('/api/posts/like', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            post_id
        })
    })
   //we need the postId b/c its not in params
    const data = await response.json()
    if(response.ok){
        await dispatch(userUnlikePost(data.post_id))
        await dispatch(removeLike(data.post_id))
        return true;
    }
}

//add a comment
export const commentPost = (submission) => async dispatch => {

    // const {postId} = submissions
    // const formData = new FormData()
    // formData.append("commentText", commentText)
    // formData.append("postId", post_id)

    const res = await fetch("/api/posts/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submission)  // we send this to backend route it gets commited
    })

    const data = await res.json()
    //return //? u have to return IT DEPENDS
}

const initialState = {}
export default function postsReducers(posts = initialState, action) {
    let postId;
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
        case ADD_LIKE:
            postId = action.payload
            posts[postId].num_likes++;
            return {...posts}
        case REMOVE_LIKE:
            postId = action.payload
            if(posts[postId].num_likes > 0){
                posts[postId].num_likes--;
            }
            return {...posts}
        case SET_LIKES:
            console.log("STATE", posts)
            console.log("PAYLOAD", action.payload)
        default:
            return posts;
    }
}
