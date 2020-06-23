const initialState = {
  error: null,
  loading: false,
  results: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "POST_FORM_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      }
    case "POST_FORM_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case "POST_FORM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
