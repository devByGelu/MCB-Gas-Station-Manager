const initialState = {
  error: undefined,
  loading: false,
  results: undefined,
  editing: false,
};
const adjustPumpAttendants = (pumpAttendants) => {
  const toPush = 3 - pumpAttendants.length;
  const extra = [];
  for (let i = 0; i < toPush; i++) extra.push(null);
  return [...pumpAttendants, ...extra];
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
        results: {
          ...action.payload,
          pumpAttendants: adjustPumpAttendants(action.payload.pumpAttendants),
        },
      };
    case "REINITIALIZE_FORM_DATA":
      return {
        ...state,
        loading: false,
        results: {
          ...action.payload,
          pumpAttendants: adjustPumpAttendants(action.payload.pumpAttendants),
        },
      };
    case "FETCH_FORM_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "TOGGLE_SHIFT_FORM_EDIT_MODE":
      return {
        ...state,
        editing: !state.editing,
      };
    case "SHIFT_FORM_CREATED":
      return {
        ...state,
        results: {
          ...state.results,
          shiftFormNotFound: undefined,
          fId: action.payload,
        },
      };
    case "RESET_FORM_DATA":
      return initialState;
    default:
      return state;
  }
};
