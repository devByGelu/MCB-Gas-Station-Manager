const init = {
  msg: "No message",
  status: null,
  id: null,
}
export default (state = init, action) => {
  switch (action.type) {
    case "GET_ERRORS": {
      const { msg, status, id } = action.payload
      return {
        msg,
        status,
        id,
      }
    }
    case "CLEAR_ERRORS": {
      return init
    }
    default:
      return state
  }
}
