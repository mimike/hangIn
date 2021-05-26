import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getUsersThunk} from "../../store/users"
import "./Follows.css"

import "."
function Follows(){
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const users = useSelector(state => state.users)
    const following = {};
    const followers = {}

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    if(!Object.values(users).length){
        return <h1>no connections</h1>
    }

    for (let key in user.following ){
        following[user.following[key]] = users[user.following[key]]
    }

    for (let key in user.followers){
        followers[user.followers[key]] = users[user.followers[key]]
    }

    return (
        <>
            <p> this person's following</p>
            <div className="follow-container">
                {Object.values(following).map(follower => {

                    return(

                        <div className="single-connection">
                            {follower.first_name}, {follower.last_name}
                            <div>
                                {follower.headline}
                            </div>
                            <div>
                                {follower.city}, {follower.state}
                            </div>
                        </div>
                    )
                })}
            </div>


            <p> this person's followers</p>
            <div className="follow-container">
                {Object.values(followers).map(follower => {

                    return(

                        <div className="single-connection">
                            {follower.first_name}, {follower.last_name}
                            <div>
                                {follower.headline}
                            </div>
                            <div>
                                {follower.city}, {follower.state}
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
export default Follows
