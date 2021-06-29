import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../store/users"
import {follow, unfollow} from '../store/users'
import "../components/ProfilePage/ProfilePage.css"
import "../components/SideBar/SideBar.css"

//profile page
function User() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  const currentUserId = useSelector(state => state.session.user.id)
  const people = useSelector(state => state.users)
  const aerialist = useSelector(state => state.session.user)

  //hook
  const followButton = async(e) => {
    await dispatch(follow(userId, currentUserId))
    // return {
    //   "userId": userId,
    //   "currentUser": currentUser
    // }
  }

  const unfollowButton = async(e) => {
    await dispatch(unfollow(userId, currentUserId))
  }

  //if people[user]
  function checkUser(){
    if(currentUserId !== userId){
      return (
        <>
          {people[userId]?.followers[`follower_id-${currentUserId}`] &&
            <button className="follow-me" onClick={unfollowButton}>Following</button>
          }

          {!people[userId]?.followers[`follower_id-${currentUserId}`] &&
          <button className="unfollow-me" onClick={followButton}>Follow</button>
          }
        </>
      )
    }
  }

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [dispatch])

  if (!Object.values(people).length) {
    return null;
  }

  const person = people[userId]

  return (
    <>
            {/* <div className="side-bar">

            <li className="user-name">
                <div>
                    <img className="side-avatar-circle" src={aerialist.avatar_url}/>
                </div>

                {aerialist.first_name} {aerialist.last_name}</li>
            <li>
                <i class="fab fa-facebook-messenger messenger" ></i>
                <span>Messages</span>
            </li>

            <li>
                <i class="fas fa-walking walking"></i>
                <span>Gigs</span>
            </li>

            <li><i class="fas fa-user-friends friends" ></i> Connections</li>
            </div> */}
      <div className="profile-page-container">
              <div className="first-container">

                  <div className="cover-container">
                      <img className="cover-pic1" alt="user cover image" src={person?.cover_url} />
                      <img className="avatar-pic1" src={person?.avatar_url} />
                  </div>
                  <div className="profile-text1">
                    {checkUser()}
                      <h3 className="my-name">{person?.first_name} {person?.last_name}</h3>
                      <h3 className="my-headline">{person?.headline}</h3>
                  <div className="my-location">
                    <h3>{person?.city}, {person?.state}, United States</h3>
                    {/* <div onClick={() => history.push(`/connections/${userId}`)} className="num-connections"> */}
                      {/* {Object.values(person?.followers).length} */}
                    {/* Followers
                    </div> */}

                    <div onClick={() => history.push(`/connections/${userId}`)} className="num-connections2">
                      {/* {Object.values(person?.following).length} */}
                      Connections</div>



                  </div>

              </div>
      </div>
            <div className="middle-container">
            <div className="about-container">
            <h4>About</h4>
                    <h5>
                      {person?.about}
                    <h5/>

                    <h5>
                        Main Discipline: {person?.skills}
                    </h5>

                    <h5>
                      Circus Minors: Rope, Hoop, Invented Apparatus, Rope and harness, Bungee, Low-Flying Trapeze
                    </h5>

                    <h5>
                      Other: Coding, Collaborating, Crashing
                    </h5>
                    </h5>


                  </div>
              </div>
              <div className="last-container">
                <h4>Experience</h4>
                <h5>
                  {person?.experience}
                </h5>
              </div>
            </div>
    {/* <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul> */}
    </>
  );
}
export default User;
