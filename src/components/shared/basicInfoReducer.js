import { getFormInitialValues } from "redux-form"
import formInit from "../pages/ShiftForm/formInit"

const initialState = {
  error: null,
  loading: false,
  results: formInit(),
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BASIC_INFO_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      }
    case "FETCH_BASIC_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case "FETCH_BASIC_INFO_FAILURE":
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
