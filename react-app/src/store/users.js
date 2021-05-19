

const GET_USERS = "users/GET_USERS"
const ADD_SINGLE_USER ="users/ADD_SINGLE_USER"
const DELETE_USER = "users/DELETE_USER"

const ALL_FOLLOWERS = "users/ALL_FOLLOWERS"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = "users/UNFOLLOW"

const getUsers = users => ({
    type: GET_USERS,
    payload: users
})
const addUser = (user) => ({
    type: ADD_SINGLE_USER,
    payload: user
})
const deleteUser = () => ({
    type: DELETE_USER,
})
const getAllFollowers = (user) => ({
    type: ALL_FOLLOWERS,
    payload: user
})


const userFollowUser = (user) => ({
    type: FOLLOW,
    payload: user
})
const userUnfollowUser = (user) => ({
    type: UNFOLLOW,
    payload: user
})

//thunk:
export const getUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/') //method: "GET" by default
    if (!response.ok){
        throw response
        }    // default 500 error
        const users = await response.json() //now we can read the backend dictionary
        dispatch(getUsers(users))
        return
}
export const getUserThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/${id}`,{
    })
    if (response.ok){
        const user = await response.json();
        dispatch(addUser(user))
    }
}
// export const singleUserThunk = () => async (dispatch) => {
// }

export const follow = (userId, currentUserId) => async(dispatch) => {
    const response = await fetch("/api/followers/", {
     method: "POST",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify({
         userId,    //line 8follower_id in joins table
         //currentUser  //line 9, user_id
     })
   })
   //////////////
   const data = await response.json();
   if(response.ok){
       data.currentUserId = currentUserId;
       dispatch(userFollowUser(data))
    //    return {"follows": data}
   }
}

export const unfollow = (userId, currentUserId) => async dispatch => {
    const response = await fetch('/api/followers/', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId

        })
    })
    const data = await response.json();
    if(response.ok){
        data.currentUserId = currentUserId;
        dispatch(userUnfollowUser(data))
        // return {"follows": data}
    }
}

export const allUserFollowInfo = (userId) => async dispatch => {
    const response = await fetch(`/api/followers/follows/${userId}`)

    const data = await response.json();
    if (response.ok){
        dispatch(getAllFollowers(data))
        return {"following": data}
    }
}

//reducer
const initialState = {}
export default function usersReducer(users = initialState, action) {
    let newState;
    switch (action.type){
        case GET_USERS:
            const usersPayload = action.payload
            const newUsers = {}
            for (const user of usersPayload.users){
                newUsers[user.id] = user
                //{1: {id:1, name:mimi}}
                //2:{id: 2, name:joe}
                //3: {id: 3, name: troy, city: etc}
            }
            return newUsers

        case ADD_SINGLE_USER:  //users/12
            const userPayload = action.payload
            const newUsersSingle = {...users} // ...state
            newUsersSingle[userPayload.id] = userPayload
            return newUsersSingle;
            // maintaining all the database info and just throwing in the new person
        case ALL_FOLLOWERS:
            return {
                ...users,
                "following": action.payload.following,
                "followers": action.payload.followers
            }

        // to do: i dont need a follow case.
        //make a, (all) followers case, "followers": [...actiion.payload]

        case FOLLOW:
            newState = Object.assign({}, users)
            newState[action.payload.id].followers[`follower_id-${action.payload.currentUserId}`] = action.payload.currentUserId

            return newState;
        case UNFOLLOW:
            newState = Object.assign({}, users)
            delete newState[action.payload.id].followers[`follower_id-${action.payload.currentUserId}`]
            return newState;

            default:
                return users
    }
}

//         for (const user of userPayload){
//             newUser[user.id] = user
//         } line 52 taken out


// user does something. (that fires off a useEffect that dispatches a thunk.)
// it calls the thunk. thunk calls the back end. the backend responds w/a JSONIFIED object which represents all the users. comes back to the front end.

//ALTERNATE may delete later
//        case ONLY_ONE_USER:
//             const newUser = {}
//             newUser[userPayload.id] = userPayload
//             return newUser;
//         case DELETE_USER:
