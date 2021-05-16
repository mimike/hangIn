import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import { } from "../../store/posts"
import "./Likes.css"
import "../Feed/Feed.css"
import {likePost, unlikePost} from "../../store/posts"
// Post Likes / Unlikes
function Likes({post}) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => state.posts)
  const [liked, setLiked] = useState(false)
  const [ switched, setSwitched ] = useState("")

  useEffect (() => {

    if(user.likes[post.id]){
      setLiked(true)
    } else if(!user.likes[post.id]){
      setLiked(false)
    }
  }, [user.likes[post.id], switched])

  const handleLike = async (e) => {
    await dispatch(likePost(post.id))
    setSwitched(true)
  }

  const handleUnlike = async (e) => {
    await dispatch(unlikePost(post.id))
    setSwitched(false)
  }

    return (
        <>
          <div className="likes-container">
          <div className="num-likes">
            {posts[post.id].num_likes}
          </div>

          <div className = "like-icon">
            { liked &&
              <div onClick={handleUnlike}>
                <i className="far fa-thumbs-up liked" ></i>
                </div>
            }
            { !liked &&
              <div onClick={handleLike}>  <i className="far fa-thumbs-up unliked"></i></div>
            }


            </div>
          </div>
        </>
    )
}
export default Likes
