import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  useHistory } from "react-router-dom";
import {getAllPosts, getPostLikes } from "../../store/posts";
import "./Feed.css"
import "../UploadBox/UploadBox.css"
import UploadBox from "../UploadBox"
import Comments from "../Comments"
import Likes from "../Likes"
import CommentsBoxModal from '../CommentsBoxModal';
import displayPosts from '../../store/posts'

function Feed() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [displayPosts, setDisplayPosts] = useState([])
  const posts = useSelector(state => state.posts)
  // console.log("POSTS", posts)
  //const comments = posts[postId]  //this logic??

  //when i do line 31- infin loop
  // useEffect(() =>  {
  //   setDisplayPosts(posts)
  // }, [posts])

  // useEffect(()=> {
  //   dispatch(getAllPosts())
  // }, [dispatch])

  useEffect(() =>  {
    setDisplayPosts(posts)
  }, [posts])

  useEffect(()=> {
    dispatch(getAllPosts())
  }, [dispatch])   //dependancy array {}
  history.push('/feed')

  const profileLink = id => {
    history.push(`/user/${id}`)
  }

  // const success = await dispatch(commentPost())
  // if(success){
  //   dispatch(getAllPosts())
  // }


  return (
    <>
        <div className="upload-box-container">
          <UploadBox/>
        </div>
        <div className="feed-container">
          <div className="post-container">
              {Object.values(displayPosts).map((post, index) => {

                  return(

                      <div className="single-post" onClick={() => getAllPosts(post.id)} key={index}>
                          <div className="top-post-container">
                            <img className="author-photo" alt="avatar" src={post.author.avatar_url}/>
                            <div className="author-details">
                              <p className="author-name-post">{post.author.first_name} {post.author.last_name}</p>
                              <p className="author-headline-post">{post.author.headline}</p>
                            </div>
                          </div>

                          <li className="text-post" >{post.text_body}</li>
                          <img className="photo-post" alt="post-photo" src={post.media_url}/>

                          <div className="comment-container" >
                          <CommentsBoxModal/>

                            <Comments post_id={post.id}/>


                            {post.comments.map((comment, index) => {
                              const commenterId = comment.author_id
                              // console.log("COMEnterid", commenterId)
                              return(
                                <div className= "comment-by" key={`${post.id}-${comment.id}`}>
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

                            <div>
                              <Likes/>
                            </div>

                          </div>

                      </div>
                  )
              })}
          </div>
        </div>
    </>
  );
}

export default Feed




{/*
<div class="profile">
  <img src="mimi.gif">
  <div class="dets">
      <p>Demo User :)</p>
      <p>Dancer</p>
  </div>
</div> */}
