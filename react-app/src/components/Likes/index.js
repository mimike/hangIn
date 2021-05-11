import React, {useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import { } from "../../store/posts"

// Post Likes / Unlikes
function Likes() {

  const [likeId, setLikeId] = useState()
  const [postId, setPostId] = useState()
  const [commentId, setCommentId] = useState()

  const handleLike = async (e) => {

  }

  const handleUnlike = async (e) => {

  }
  //
    return (
        <>

        <div><i class="far fa-comment"></i></div>
        <div><i class="far fa-thumbs-up"></i></div>
        </>
    )
}
export default Likes
