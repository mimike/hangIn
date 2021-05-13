//actions
const GET_USERS = "users/GET_USERS"
const ADD_SINGLE_USER ="users/ADD_SINGLE_USER"
const DELETE_USER = "users/DELETE_USER"
//const ONLY_ONE_USER = "users/ONLY_ONE_USER"

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
// const singleUser = (user) => ({  //DO I NEED THIS ?!
//     type: ONLY_ONE_USER,
//     payload: user
// })

//thunk:
export const getUsersThunk = () => async (dispatch) => {
    console.log("TQWLVEE!")
    const response = await fetch('/api/users') //method: "GET" by default
    if (!response.ok){
        throw response
        }    // default 500 error
        const users = await response.json() //now we can read the backend dictionary
        dispatch(getUsers(users))
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
const initialState = {}
const usersReducer = (users = initialState, action)=> {
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

        //ALTERNATE may delete later
        // case ONLY_ONE_USER:
        //     const newUser = {}
        //     newUser[userPayload.id] = userPayload
        //     return newUser;

        case DELETE_USER:


            default:
                return users
            }
        }
        export default usersReducer

        // for (const user of userPayload){
        //     newUser[user.id] = user
        // } line 52 taken out


//user does something. (that fires off a useEffect that dispatches a thunk.)
//it calls the thunk. thunk calls the back end. the backend responds w/a JSONIFIED object which represents all the users. comes back to the front end.
