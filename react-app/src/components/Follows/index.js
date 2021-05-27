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
                            {follower?.first_name}, {follower?.last_name}
                            <div>
                                {follower?.headline}
                            </div>
                            <div>
                                {follower?.city}, {follower?.state}
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
export default Follows
