const init = 1 
export default (state = init, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_DAY': {
      return action.payload.day
    }
    default:
      return state
  }
}
