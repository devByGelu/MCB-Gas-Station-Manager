const dateFormat = require('dateformat')
const initialState = {
  month:dateFormat(new Date(),'m'),
  year:dateFormat(new Date(),'yyyy'),
  error: null,
  loading: false,
  results: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MONTH_FORMS_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      }
    case "FETCH_MONTH_FORMS_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case "FETCH_MONTH_FORMS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case "DELETE_FORM": {
      console.log("target fId", action.payload.fId)
      console.log("old length", state.results.length)
      const newResults = state.results.filter(
        (form) => form.fId != action.payload.fId
      )
      console.log("new length", newResults.length)
      return {
        ...state,
        results: newResults,
      }
    }
    case "APPEND_FORM": {
      return { ...state, results: [...state.results, action.payload] }
    }
    default:
      return state
  }
}
