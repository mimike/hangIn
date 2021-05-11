import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";
import {getAllPosts} from "../../store/posts";
import "./Feed.css"
import UploadBox from "../UploadBox"
import Comments from "../Comments"
import Likes from "../Likes"

function Feed() {
  console.log("is this?!?!?")
  const dispatch = useDispatch();

  const [displayPosts, setDisplayPosts] = useState([])
  const posts = useSelector(state => state.posts)
  // console.log("POSTS", posts)
  //const comments = posts[postId]  //this logic??
  useEffect(() =>  {
    setDisplayPosts(posts)
  }, [posts])

  useEffect(()=> {
    dispatch(getAllPosts())
  }, [dispatch])   //dependancy array {}
  // history.push('/feed')



  return (
    <>
        <UploadBox/>
        <div className="feed-container">
          <div className="post-container">
              {Object.values(displayPosts).map((post, index) => {
                  return(
                      <div className="single-post" key={index}>
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

                            <Comments post_id={post.id}/>

                            {post.comments.map((comment, index) => {
                              return(
                                <div className= "comment-by" key={`${post.id}-${comment.id}`}>
                                  <div className="user-by">{comment.user}</div>
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
