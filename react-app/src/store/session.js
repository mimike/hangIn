// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USERS = 'session/GET_USERS';
const GET_SINGLE_USER = 'session/GET_SINGLE_USER'

const LIKE_POST = 'session/LIKE_POST'
const UNLIKE_POST = 'session/UNLIKE_POST'



const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})
const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})
const getOneUser = (user) => ({
    type: GET_SINGLE_USER,
    payload: user
})
export const userLikePost = (postId) => ({
    type: LIKE_POST,
    payload: postId
})
export const userUnlikePost = (postId) => ({
    type: UNLIKE_POST,
    payload: postId
})

// thunks
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))

}
export const demoLogin = () => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: "demo@aa.io",
            password: "password"
        }),
    })
    const data = await response.json()
    dispatch(setUser(data));
    return response;
}
export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data));
    return {};
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};

// first_name, last_name, city, state, headline, email, password. formData takes multiple data types and since we have an avatar photo we pass in formData
export const signUp = (formData) => async (dispatch)=> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: formData
        // JSON.stringify({
        //     first_name,
    });

    const data = await response.json(); // ??
    dispatch(setUser(data));
    return response
}

// reducer
const initialState = { user: null };
//not logged in user null
// useSelector(state => state.session.user)
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        case LIKE_POST:
            state.user.likes[action.payload] = action.payload
            return {...state}
        case UNLIKE_POST:
            console.log("unlike!", action.payload)
            delete state.user.likes[action.payload]
            return {...state}


        default:
            return state;
    }
}

// a thunk calls to the backend dispatches the action w/ the backend info.
// your reducer takes the payload of the ACTION, and puts it in the store.
// u use ur store to render w/e u want in ur component.
