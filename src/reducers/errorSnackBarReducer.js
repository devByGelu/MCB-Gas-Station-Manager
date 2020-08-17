export default (state = false, action) => {
  switch (action.type) {
    case "SWITCH_ERROR_SNACK_BAR": {
      return action.payload
    }
    default:
      return state
  }
}
