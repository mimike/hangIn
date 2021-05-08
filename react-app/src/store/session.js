// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USERS = 'session/GET_USERS';
const GET_SINGLE_USER = 'session/GET_SINGLE_USER'

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
        body:
            formData
        // JSON.stringify({
        //     first_name,
        //     last_name,
        //     city,
        //     state,
        //     headline,
        //     email,
        //     password,
        //}),
    });
    const data = await response.json(); // ??
    dispatch(setUser(data));
}

// reducer

const initialState = { user: null };

// useSelector(state => state.session.user)

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
