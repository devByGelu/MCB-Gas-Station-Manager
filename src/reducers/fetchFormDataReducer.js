const initialState = {
  error: undefined,
  loading: false,
  results: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FORM_DATA_REQUEST":
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case "FETCH_FORM_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      };

    case "FETCH_FORM_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
