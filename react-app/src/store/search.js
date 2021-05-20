const SEARCH_USER = "search/SEARCH_USER"
const DELETE_SEARCH = "search/DELETE_SEARCH"

const searchUser = (searchList) => ({
    type: SEARCH_USER,
    payload: searchList
})

export const searchUserThunk = (searchField) => async (dispatch) => {
    const response = await fetch ('/api/search/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: searchField
        })
    })

    const data = await response.json();
    dispatch(searchUser(data))
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
