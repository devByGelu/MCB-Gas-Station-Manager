const initialState = {
  error: null,
  loading: false,
  results: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MONTH_FORMS_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      }
    case 'FETCH_MONTH_FORMS_SUCCESS':
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case 'FETCH_MONTH_FORMS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
