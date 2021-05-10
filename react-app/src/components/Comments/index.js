import React from "react"
import { commentPost } from '../../store/posts'; //logic not done!
import "./Comments.css"
import { useDispatch } from "react-redux";

function Comments(postId){
    const dispatch = useDispatch()

    const [comment, setComment] = useState("")
    const updateComment = (e) => {
        setComment(e.target.value)
    }

    //when a user submits their comment, it should populate the posts comment and redirect to that post with the new comments
    const handleCommentSubmit = async(e) => {
        e.preventDefault()
        const params = { author_id, post_id, comment_text }  //camelcase?
        //or const formData = new FormData()
        //form.append("comment", comment)
        dispatch(commentPost(params))

        
    }
    return(
        <>
        <form className= "comment-form" onSubmit={handleCommentSubmit}>
            <input
                className="comment-input"
                type="text"
                value={comment}
                placeholder="Write stuff here"
                onChange={setComment}
            />
            <button className="post-comment">Post</button>
        </form>
        </>
    )
}
export default Comments;
