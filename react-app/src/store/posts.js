import {userLikePost, userUnlikePost } from "./session"

const UPLOAD_POST = "posts/UPLOAD_POST"
const DISPLAY_POSTS = "posts/DISPLAY_POSTS"

const ADD_LIKE = "posts/ADD_LIKE"
const REMOVE_LIKE = "posts/REMOVE_LIKE"
const SET_LIKES = "posts/SET_LIKES"

const DELETE_POST = "posts/DELETE_POST"
const DELETE_COMMENT = "posts/DELETE_COMMENT"

const createPost = (submission) => ({
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
const deletePost = (postId) =>({
    type: DELETE_POST,
    payload: postId
})
const deleteComment = (commentId) =>({
    type: DELETE_COMMENT,
    payload: commentId
})

export const deletePostThunk = (postId) => async (dispatch) =>{
    const response = await fetch('/api/posts/', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            postId
        })
    })
    if(response.ok){
        dispatch(deletePost(postId))
    }
}

export const deleteCommentThunk = (postId, commentId) => async (dispatch) => {
    const response = await fetch('/api/posts/comments/',{
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentId
        })
    })
    if(response.ok){
        dispatch(deleteComment({commentId, postId}))
    }
}
export const uploadPost = (submission) => async (dispatch) =>{
    const { mediaUrl, textBody } = submission  //textbody!

    const formData = new FormData()
    formData.append("textBody", textBody)
    //formData.append("mediaUrl", mediaUrl)
    console.log(mediaUrl ? true : false)
    if (mediaUrl){
        formData.append("mediaUrl", mediaUrl)
    }
    console.log("we got in front of fetch", formData)
    const res = await fetch("/api/posts/", {
        method: "POST",
        body: formData
        // headers: {
        //     "Accept": "application/json"
        //  },
    })
    console.log("we got in after of fetch", res)
    if(res.ok){
        const data = await res.json()
        dispatch(createPost(data))
        return res   //why return res
    }



}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    if (response.ok) {
        const data = await response.json();
        dispatch(displayPosts(data.posts))
        // return posts;
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
    let newPosts;
    switch (action.type) {
        case UPLOAD_POST:
            const postPayload = action.payload
            newPosts = {...posts}  //...we dont want to get rid of other posts
            newPosts[postPayload.id] = postPayload
            return newPosts
        case DISPLAY_POSTS:
            // const postsPayload = action.payload
            // const newAllPosts = {}
            // for (const post of postsPayload.posts){
            //     newAllPosts[post.id] = post
            // }
            // return newAllPosts
            return {...action.payload}
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
        case DELETE_COMMENT:
            newPosts = Object.assign({}, posts); //copy of old state
            delete newPosts[action.payload.postId].comments[action.payload.commentId]
            return newPosts;
        case DELETE_POST:
            newPosts = Object.assign({}, posts); //copy of old state
            delete newPosts[action.payload]
            return newPosts;

        default:
            return posts;
    }
}
