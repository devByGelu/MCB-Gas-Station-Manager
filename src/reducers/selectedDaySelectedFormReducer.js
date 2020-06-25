const init = 0 
export default (state = init, action) => {
  switch (action.type) {
    case 'CHANGED_SELECTED_DAY_SELECTED_FORM': {
      return action.payload.placement
    }
    default:
      return state
  }
}
