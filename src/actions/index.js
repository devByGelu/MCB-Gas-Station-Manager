import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder'
// Thunk in action
export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts')
    // Thunk allows us to wait for a request, then allows us to dispatch the action that contains the payload we need!
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
  }
}

// Unmemoized
// export const fetchUser = (id) => async (dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)
//   dispatch({type: 'FETCH_USER', payload: response.data})
// }

// Memoized Why? To eliminate repetitive requests
// Memoization -> if function is called with same arguments, auto return last returned result!
export const fetchUser = id => dispatch => {
  _fetchUser(id,dispatch)
}

const _fetchUser= _.memoize(async (id,dispatch)=>{
  const response = await jsonPlaceholder.get(`users/${id}`)
  dispatch({type: 'FETCH_USER', payload: response.data})
})