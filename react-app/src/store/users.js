//actions
const GET_USERS = "users/GET_USERS"
// const SINGLE_USER ="users/GET_USER"

const getUsers = people => ({
    type: GET_USERS,
    payload: people
})

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

const initialState = {}

const usersReducer = (users = initialState, action)=> {
    switch (action.type){
        case GET_USERS:
            const usersPayload = action.payload
            const newUsers = {}
            for (const user of usersPayload.users){
                newUsers[user.id] = user
                //{1 {id:1, name:mimi}}
                //2 {id: 2, name:joe}
            }
            return newUsers
        default:
            return users
    }
}
export default usersReducer



//user does something. (that fires off a useEffect that dispatches a thunk.)
//it calls the thunk. thunk calls the back end. the backend responds w/a JSONIFIED object which represents all the users. comes back to the front end.
