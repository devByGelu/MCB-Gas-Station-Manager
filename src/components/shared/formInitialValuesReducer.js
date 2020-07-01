import formInit from "../pages/ShiftForm/formInit"
const initialState = {
  error: null,
  loading: false,
  results: formInit(),
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "FORM_INITIAL_VALUES_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      }
    case "FORM_INITIAL_VALUES_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case "FORM_INITIAL_VALUES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case "CLOSE_FORM":
      return initialState

    default:
      return state
  }
}
