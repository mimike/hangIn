import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getUsersThunk} from "../../store/users"
import "./Follows.css"

import "."
function Follows(){
    const dispatch = useDispatch();
    const { userId } = useParams();

    const currentUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const following = {};
    const followers = {}

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    if(!Object.values(users).length){
        return <h1>no connections</h1>
    }

    // if(currentUser){
    //     for (let key in user.following ){
    //         following[user.following[key]] = users[user.following[key]]
    //     }
    // }
    console.log(users, "!USER!")
    if(Object.values(currentUser.following).length){
        for (let key in currentUser.following ){
            following[currentUser.following[key]] = users[currentUser.following[key]]
        }
    }

    if(Object.values(currentUser.followers).length){
        for (let key in currentUser.followers){
            followers[currentUser.followers[key]] = users[currentUser.followers[key]]
        }
    }

    return (
        <>

            <div className = "single-connection2"> {currentUser.first_name} is following</div>
            <div className="follow-container">
                {Object.values(following).map(follower => {

                    return(
                        <div className="single-connection">
                            <div className= "avatar-container">
                                <img className="avatar-circle" src={follower.avatar_url} />
                            </div>

                            <div className="follower-info-container">
                            {follower.first_name}, {follower.last_name}
                            <div>
                                {follower.headline}
                            </div>
                            <div>
                                {follower.city}, {follower.state}
                            </div>
                            </div>

                        </div>
                    )
                })}
            </div>


            <div className="single-connection2"> {currentUser.first_name}'s followers</div>
            <div className="follow-container">
                {Object.values(followers).map(follower => {

                    return(
                        <div className="single-connection">
                            <div className= "avatar-container">
                                <img className="avatar-circle" src={follower.avatar_url} />
                            </div>

                            <div className="follower-info-container">
                            {follower.first_name}, {follower.last_name}
                            <div>
                                {follower.headline}
                            </div>
                            <div>
                                {follower.city}, {follower.state}
                            </div>
                            </div>

                        </div>

                        // <div className="single-connection">
                        //     <img className="avatar-circle" src={follower.avatar_url} />
                        //     {follower?.first_name}, {follower?.last_name}
                        //     <div>
                        //         {follower?.headline}
                        //     </div>
                        //     <div>
                        //         {follower?.city}, {follower?.state}
                        //     </div>
                        // </div>
                    )
                })}
            </div>

        </>
    )
}
export default Follows
