import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  useHistory } from "react-router-dom";
import {getAllPosts} from "../../store/posts";
import UploadBox from "../UploadBox"
import CommentsBoxModal from '../CommentsBoxModal';
import Comments from "../Comments"
function Test(){
    const history = useHistory()
    const dispatch = useDispatch();
    const [displayComments, setDisplayComments] = useState([])
    const posts = useSelector(state => state.posts)
  // console.log("POSTS", posts)
  //const comments = posts[postId]  //this logic??

  useEffect(() =>  {
    setDisplayComments(posts)
  }, [posts])

  useEffect(()=> {
    dispatch(getAllPosts())
  }, [dispatch])

  const profileLink = id => {
    history.push(`/user/${id}`)
  }
    return (
        <>
             
            <h1>modal</h1>
        {/* <div className="feed-container">
          <div className="post-container">
              {Object.values(posts).map(post => {
                  return(
                      <div className="single-post">

                          <div className="comment-container" >

                            {posts.comments.map((comment) => {
                              const commenterId = comment.id
                              // console.log("COMEnterid", commenterId)
                              return(
                                <div className= "comment-by" key={`${comment.id}`}>
                                    <div className="click-me" id = {commenterId} onClick={()=> profileLink(commenterId)}>
                                      <img className="comment-photo" src={comment.photo}/>
                                    </div>

                                  <div
                                  onClick={()=> profileLink(commenterId)} className="user-by">{comment.user}
                                  </div>
                                  <div className="comment-text">{comment.comment_text}</div>
                                </div>
                              )
                            })}

                          </div>

                      </div>
                  )
              })}
          </div>
        </div> */}
        </>
    )
}
export default Test;
