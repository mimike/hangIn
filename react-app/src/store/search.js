const SEARCH_USER = "search/SEARCH_USER"
const DELETE_SEARCH = "search/DELETE_SEARCH"

const searchUser = (searchQuery) => ({
    type: SEARCH_USER,
    payload: searchQuery
})

export const searchUserThunk = (searchQuery) => async (dispatch) => {
    const response = await fetch ('/api/search/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: searchQuery
        })
    })
    // after we assign the obj to response
    const data = await response.json();
    dispatch(searchUser(data))
    // line 28 in order to change the state
}


const initialState = { search: null };
export default function searchReducer (state = initialState, action){
    switch (action.type) {
        case SEARCH_USER:
            return { search: action.payload}
        case DELETE_SEARCH:
            return {}
        default:
            return state;
    }
}
