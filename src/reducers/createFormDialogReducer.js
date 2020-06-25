
const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CREATE_FORM_DIALOG":
      return {
        ...state,
        open: !state.open
      }

    default:
      return state
  }
}