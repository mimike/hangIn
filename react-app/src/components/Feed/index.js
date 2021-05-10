import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllPosts} from "../../store/posts";
import "./Feed.css"
import UploadBox from "../UploadBox"

function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  console.log("POSTS", posts)

  useEffect(()=> {
    console.log("WEGOTTOHER11111EEEEELKkdfjlsfdjasl")
    dispatch(getAllPosts())
  }, [dispatch])   //dependancy array {}
  return (
    <>
        <UploadBox/>
        <div className="feed-container">
          <div className="post-container">
              {Object.values(posts).map(post => {
                  return(
                      <div className="single-post" key={post.id}>
                          <div className="top-post-container">
                            <img className="author-photo" alt="avatar" src={post.author.avatar_url}/>
                            <div className="author-details">
                              <p className="author-name-post">{post.author.first_name} {post.author.last_name}</p>
                              <p className="author-headline-post">{post.author.headline}</p>
                            </div>
                          </div>

                          <li className="text-post" >{post.text_body}</li>
                          <img className="photo-post" alt="post-photo" src={post.media_url}/>

                          <div className="comment-container">
                          <h1>add a comment:</h1>
                          <div>
                            <i class="far fa-thumbs-up"></i>
                          </div>
                          <div>
                            <i class="far fa-comment"></i>
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
