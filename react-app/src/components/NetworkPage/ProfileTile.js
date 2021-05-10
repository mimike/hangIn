import React, {useEffect} from "react"
import "./NetworkPage.css"
import pic from "../../../src/images/profilepic.jpg"
import cover from "../../images/mimicover.jpeg";
import {getUsersThunk} from "../../store/users"
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import "./NetworkPage.css"

function ProfileTile (){
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])


    return (
        <>
            <div className="test">
                {Object.values(users).map(user => {
                    return(
                        <div className="tile-container" key={user.id}>
                            <div className="photo-container">
                                <img className="cover-pic" alt="cover" src={user.cover_url}/>
                                <img className="avatar-pic" alt="profile" src={user.avatar_url}/>
                            </div>

                            <div className="profile-text">
                                <p className="name">{user.first_name} {user.last_name}</p>
                                <p className="job">{user.headline}</p>
                            </div>

                            <div className="connect-btn">
                                <Link className="connect-link" to={`/user/${user.id}`}>Connect</Link>
                                {/* <button className="connect">Connect</button> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className="test">
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default ProfileTile;
