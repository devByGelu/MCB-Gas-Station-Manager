/*

    Rules of Reducers

    1. Must not return undefined
        > during
            1. initialization
            2. dispatches

    2. Produces state based on previous state and action
        > At initialization, 1st arg = undefined, so return null/empty array/empty string.. etc
        > At first dispatch after initilization, 1st arg = whatever initialization returned
        > At second dispatch, 1st arg = whatever first dispatch returned 
        > and so on...

    3. Must be pure functions!
        > Illegal
            1. document.querySelector('#id')
            2. axios.get('/posts')

        > return values must be based on the state and action arguments only

    4. Must not mutate state
*/
export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload
    default:
      return state
  }
}
