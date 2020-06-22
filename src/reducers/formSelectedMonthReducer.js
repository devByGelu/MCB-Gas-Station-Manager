const initialState = {
  error: null,
  loading: false,
  results: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FORM_MONTH_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      }
    case 'FETCH_FORM_MONTH_SUCCESS':
      return {
        ...state,
        loading: false,
        results: action.payload,
      }

    case 'FETCH_FORM_MONTH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
