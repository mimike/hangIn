import React, { useEffect, useState } from "react";
import "./NetworkPage.css";
import { getUsersThunk } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NetworkPage.css";
//react doesnt like it when u return 2 things from a component.
// when u return 2 divs froms a sibling component
//

function ProfileTile() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session.user);
  const [following, setFollowing] = useState({});

  // const following = {};

  // useEffect(() => {
  //     dispatch(getUsersThunk())
  // }, [dispatch])

  useEffect(() => {
    (async () => {
      await dispatch(getUsersThunk());
    })();

    for (let key in currentUser.following) {
      const numKey = key.split("-")[1]; //3, 69
      if(Number(numKey) !== currentUser.id){
        following[currentUser.following[key]] = users[numKey];
      }
    }
    // all users minus the sessionUser
  }, [dispatch]);

  if (!Object.values(currentUser.following).length) {
    return (
      <>
        <div className="test">
          <h1></h1>
          {Object.values(users).length &&
            Object.values(users).map((user) => {
              return (
                <>
                  <div className="tile-container" key={user.id}>
                    <div className="photo-container">
                      <img
                        className="cover-pic"
                        alt="cover"
                        src={user.cover_url}
                      />
                      <img
                        className="avatar-pic"
                        alt="profile"
                        src={user.avatar_url}
                      />
                    </div>

                    <div className="profile-text">
                      <p className="name">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="job">{user.headline}</p>
                    </div>

                    <div className="connect-btn">
                      <Link className="connect-link" to={`/user/${user.id}`}>
                        Connect
                      </Link>

                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="test">
        {Object.values(following).length &&
          Object.values(following).map((user) => {
            return (
              <div className="tile-container" key={user?.id}>
                <div className="photo-container">
                  <img className="cover-pic" alt="cover" src={user?.cover_url} />
                  <img
                    className="avatar-pic"
                    alt="profile"
                    src={user?.avatar_url}
                  />
                </div>

                <div className="profile-text">
                  <p className="name">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="job">{user?.headline}</p>
                </div>

                <a
                  className="connect-btn"
                  href={`/user/${user?.id}`}
                  className="connect-btn"
                >
                  <Link className="connect-link" to={`/user/${user?.id}`}>
                    View Profile
                  </Link>

                </a>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default ProfileTile;
