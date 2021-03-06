//this component is the add a comment and post button
import React, {useState} from "react";
import { commentPost } from '../../store/posts';
import "./Comments.css"
//import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from "../../store/posts";

function Comments({post_id}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [commentText, setCommentText] = useState("")

    const updateComment = (e) => {
        setCommentText(e.target.value)
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const params = { postId: post_id, commentText }
        dispatch(commentPost(params)).then(() => {
            setCommentText("")  // clear the comment box after commenting
        })
        dispatch(getAllPosts())
        //dispatch(getAllPosts()) limit(10)
    }

    const handleCommentEnter = (e) => {
        if(e.keyCode === 13){
            handleCommentSubmit();
        }
        dispatch(getAllPosts())
    }


    return(
        <>
        <form className= "comment-form" onSubmit={handleCommentSubmit}>
            <div className="user-comment-box">
                <label>
                    <img className="avatar-circle-comment" alt="profile circular image" src={user.avatar_url}/>
                </label>
                <input
                    className="comment-input"
                    type="text"
                    value={commentText}
                    placeholder="Add a comment"
                    onChange={updateComment}
                    onKeyPress={handleCommentEnter}
                />
            </div>


            {/* <button onClick ={handleCommentSubmit} type="submit" className="post-comment">Post</button> */}
        </form>

        </>
    )
}
export default Comments;
