//this component is the add a comment and post button
import React, {useState} from "react";
import { commentPost } from '../../store/posts';
import "./Comments.css"
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from "../../store/posts";
function Comments({post_id}){
    const dispatch = useDispatch()

    const [commentText, setCommentText] = useState("")

    const updateComment = (e) => {
        setCommentText(e.target.value)
    }
    const handleCommentSubmit = (e) => {
        console.log("!!!!!")
        e.preventDefault()
        const params = { postId: post_id, commentText }
        dispatch(commentPost(params))
        dispatch(getAllPosts())
    }

    return(
        <>
        <form className= "comment-form" onSubmit={handleCommentSubmit}>
            <input
                className="comment-input"
                type="text"
                value={commentText}
                placeholder="Add a comment"
                onChange={updateComment}
            />
            <button type="submit" className="post-comment">Post</button>
        </form>
        {/* <button type="submit" className="see-comments">Comments</button> */}
        </>
    )
}
export default Comments;
