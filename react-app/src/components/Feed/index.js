import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPosts,
  deleteCommentThunk,
  deletePostThunk,
} from "../../store/posts";
import SideBar from "../../components/SideBar"
import "./Feed.css";
import "../UploadBox/UploadBox.css";
import UploadBox from "../UploadBox";
import Comments from "../Comments";
import Likes from "../Likes";
import CommentsBoxModal from "../CommentsBoxModal";

function Feed() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      setLoaded(false);
    });
  }, [dispatch]);

  if (loaded) {
    return (
      <div>
        <h4>
          <i class="far fa-clock"></i> feed page uploading...
        </h4>
      </div>
    );
  }

  const profileLink = (id) => {
    history.push(`/user/${id}`);
  };

  const handleDeletePost = async (postId) => {
    await dispatch(deletePostThunk(postId));
    await dispatch(getAllPosts());
  };
  const handleDeleteComment = async (commentId, postId) => {
    await dispatch(deleteCommentThunk(postId, commentId));
    await dispatch(getAllPosts());
  };

  return (
    <>
      <div className="upload-box-container">
        <UploadBox />
      </div>
      <div className="feed-container">
        <div className="main-post-container">
          {Object.values(posts)
            .reverse()
            .map((post, index) => {
              const authorId = post.author?.id;

              return (
                <div
                  className="single-post"
                  onClick={() => getAllPosts(user)}
                  key={index}
                >
                  <div className="top-post-container">
                    <img
                      className="author-photo"
                      alt="avatar"
                      src={post.author?.avatar_url}
                    />
                    <div className="author-details">
                      <p
                        onClick={() => profileLink(authorId)}
                        className="author-name-post"
                      >
                        {post.author?.first_name} {post.author?.last_name}
                      </p>
                      <p className="author-headline-post">
                        {post.author?.headline}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="edit-drop-down">
                      {user.id === post.author.id && (
                        <button className="edit-button" onClick={openMenu}>
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                      )}
                    </div>
                    {showMenu && (
                      <button className="edit-dropdown">
                        <div onClick={() => handleDeletePost(post.id)}>
                          <i className="fas fa-trash"></i> Delete post
                        </div>
                      </button>
                    )}
                  </div>

                  <li className="text-post">{post.text_body}</li>
                  <div className="photo-post-container">
                    {(post.media_url && post.media_url?.endsWith("mp4")) ||
                    post.media_url?.endsWith("mov") ? (
                      <video
                        controls
                        src={post.media_url}
                        className="video-post"
                      />
                    ) : (
                      <img src={post.media_url} className="photo-post" />
                    )}
                  </div>

                  <div className="likes-comments-icon-container">
                    <div>
                      <Likes post={post} />
                    </div>

                    <div className="num-comments-icon">
                      <i class="far fa-comment-dots commented"></i>
                      Comments
                      <div />
                      <button
                        className="display-comments"
                        onClick={() => {
                          if (
                            document.getElementById(`${post.id}`).style
                              .display === "none"
                          )
                            document.getElementById(
                              `${post.id}`
                            ).style.display = "";
                          else
                            document.getElementById(
                              `${post.id}`
                            ).style.display = "none";
                        }}
                      >
                        <div className="comment-numbers">
                          {posts[post.id]?.num_comments}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div
                    className="comment-container"
                    id={post.id}
                    style={{ display: "none" }}
                  >
                    <CommentsBoxModal />
                    <Comments post_id={post.id} />
                    {Object.values(post.comments)
                      .reverse()
                      .map((comment, index) => {
                        const commenterId = comment.author_id;

                        return (
                          <div
                            className="comment-by"
                            key={`${post.id}-${comment.id}`}
                          >
                            {user.id === comment.author_id && (
                              <div
                                className="delete-comment"
                                onClick={() =>
                                  handleDeleteComment(comment.id, post.id)
                                }
                              >
                                <i className="fas fa-trash"></i>
                              </div>
                            )}
                            <div
                              className="click-me"
                              id={commenterId}
                              onClick={() => profileLink(commenterId)}
                            >
                              <img
                                className="comment-photo"
                                src={comment.photo}
                              />
                            </div>

                            <div
                              onClick={() => profileLink(commenterId)}
                              className="user-by"
                            >
                              {comment.user}
                            </div>
                            <div className="comment-text">
                              {comment.comment_text}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Feed;
