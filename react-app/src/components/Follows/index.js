import React from 'react';
import {useSelector} from 'react-redux';
function Follows(){
    const user = useSelector(state =>  state.session.user)

    return (
        <>
        <div className="follow-container">
            {Object.values(user).map(follower => {
                const followerId = user.followers
                return(
                    <div className="single-connection">
                    </div>
                )
            })}
        </div>

        </>
    )
}
export default Follows
