import jsonPlaceholder from "../apis/jsonPlaceholder";
import EmployeeAPI from "../apis/EmployeeAPI";
import FormAPI from "../apis/FormAPI";
import FormsAPI from "../apis/FormsAPI";
import formInit from "../components/pages/ShiftForm/formInit";
import ExpenseCategoryAPI from "../apis/ExpenseCategoryAPI";
import ProductAPI from "../apis/ProductAPI";
import CustomerAPI from "../apis/CustomerAPI";
import ShiftFormAPI from "../apis/ShiftFormAPI";
import AuthAPI from "../apis/AuthAPI";
const dateFormat = require("dateformat");

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: "USER_LOADING",
  });
  // Getting token
  try {
    const response = await AuthAPI.get("/user", tokenConfig(getState));
    dispatch({ type: "USER_LOADED", payload: response.data });
  } catch (error) {
    const { data, status, message } = error.response;
    dispatch(returnErrors(data, status, message));
    dispatch({ type: "AUTH_ERROR" });
  }
};
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;
  return config;
};
export const returnErrors = (msg, status, id = null) => ({
  type: "GET_ERRORS",
  payload: { msg, status, id },
});
export const clearErrors = () => ({
  type: "CLEAR_ERRORS",
});
export const togglePumpInfoField = (number, field, product, switchSet) => ({
  type: "TOGGLE_PUMP_INFO_FIELD",
  payload: { number, field, product, switchSet },
});
export const fetchFormData = (year, month, day, shift, placement) => async (
  dispatch
) => {
  dispatch({
    type: "FETCH_FORM_DATA_REQUEST",
  });
  try {
    const response = await ShiftFormAPI.get(
      `/${year}/${month}/${day}/${shift}`,
      { params: { placement } }
    );
    dispatch({
      type: "FETCH_FORM_DATA_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "FETCH_FORM_DATA_FAILURE",
      payload: error.response,
    });
  }
};
export const updateOpenedForm = (date, placement) => async (dispatch) => {
  let response;
  dispatch({
    type: "FETCH_MONTH_FORMS_REQUEST",
  });

  try {
    response = await FormsAPI.get(
      `/${dateFormat(date, "yyyy")}/${dateFormat(date, "m")}`
    );
    dispatch({ type: "FETCH_MONTH_FORMS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "FETCH_MONTH_FORMS_FAILURE",
      payload: error.response,
    });
  }
  let form = response.data.find(
    (form) => form.date === date && placement === placement
  );
  dispatch({
    type: "OPEN_FORM",
    payload: {
      form,
    },
  });
};
export const closeForm = () => ({
  type: "CLOSE_FORM",
});
export const toggleShiftFormEditMode = () => ({
  type: "TOGGLE_SHIFT_FORM_EDIT_MODE",
});
export const fetchBasicInformation = (fId) => async (dispatch) => {
  dispatch({
    type: "FETCH_BASIC_INFO_REQUEST",
  });
  try {
    const response = await FormsAPI.get("/group1", {
      params: {
        fId,
      },
    });
    let formInitVals = formInit();
    dispatch({
      type: "FETCH_BASIC_INFO_SUCCESS",
      payload: { ...formInitVals, ...response.data },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "FETCH_BASIC_INFO_FAILURE",
      payload: error.response,
    });
  }
};
export const fetch = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "wawda", payload: response });
};

export const toggleCreateFormDialog = () => ({
  type: "TOGGLE_CREATE_FORM_DIALOG",
});
export const changeActiveTabNav = (tabIndex) => ({
  type: "CHANGE_ACTIVE_TAB",
  payload: {
    tabIndex,
  },
});
export const selectShiftFormDate = (selectedDate, selectedShift) => ({
  type: "SHIFTFORM_DATE_SELECTED",
  payload: {
    date: selectedDate,
    shift: selectedShift,
  },
});

export const fetchEmployees = () => async (dispatch) => {
  dispatch({
    type: "FETCH_EMPLOYEES_REQUEST",
  });
  try {
    const response = await EmployeeAPI.get("/");
    dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "FETCH_EMPLOYEES_FAILURE",
      payload: error.response,
    });
  }
};
export const fetchMonthForms = (year, month) => async (dispatch) => {
  dispatch({
    type: "FETCH_MONTH_FORMS_REQUEST",
  });

  try {
    const response = await ShiftFormAPI.get(`/${year}/${month}`);
    dispatch({
      type: "FETCH_MONTH_FORMS_SUCCESS",
      payload: { results: response.data, year, month },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_MONTH_FORMS_FAILURE",
      payload: error.response,
    });
  }
};

export const changeActivePanel = (pumpNumIndex, active) => ({
  type: "CHANGE_ACTIVE_PANEL",
  payload: {
    pumpNumIndex,
    active,
  },
});
export const resetFormData = () => ({
  type: "RESET_FORM_DATA",
});
export const changeSelectedDate = (date) => ({
  type: "CHANGE_SELECTED_DATE",
  payload: date,
});

export const changeSelectedDaySelectedForm = (placement) => ({
  type: "CHANGED_SELECTED_DAY_SELECTED_FORM",
  payload: {
    placement,
  },
});

export const openForm = (form) => ({
  type: "OPEN_FORM",
  payload: {
    form,
  },
});
export const reinitializeFormData = (values) => ({
  type: "REINITIALIZE_FORM_DATA",
  payload: values,
});

export const setShiftFormCreated = (fId) => ({
  type: "SHIFT_FORM_CREATED",
  payload: fId,
});
export const toggleMenuItem = (index) => ({
  type: "TOGGLE_MENU_ITEM",
  payload: index,
});
export const submitform = (year, month, day, placement, eId, shift) => async (
  dispatch
) => {
  dispatch({
    type: "POST_FORM_REQUEST",
  });
  try {
    const response1 = await FormAPI.post("/", {
      year,
      month,
      day,
      placement,
      eId,
      shift,
    });
    dispatch({ type: "POST_FORM_SUCCESS", payload: response1.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "POST_FORM_FAILURE",
      payload: error.response,
    });
  }
};
// Action used when all forms' id are null
export const postFormRequest = (
  year,
  month,
  day,
  placement,
  eId,
  shift
) => async (dispatch) => {
  dispatch({
    type: "POST_FORM_REQUEST",
  });
  try {
    const response = await FormAPI.post("/", {
      year,
      month,
      day,
      placement,
      eId,
      shift,
    });
    dispatch({ type: "POST_FORM_SUCCESS", payload: response.data });
    dispatch({
      type: "APPEND_FORM",
      payload: response.data[0],
    });
  } catch (error) {
    dispatch({
      type: "POST_FORM_FAILURE",
      payload: error.response,
    });
  }
};

export const deleteForm = (fId) => async (dispatch) => {
  dispatch({
    type: "DELETE_FORM_REQUEST",
  });

  try {
    const response = await FormAPI.delete(`/${fId}`);
    dispatch({ type: "DELETE_FORM_SUCCESS", payload: response.data });
    dispatch({ type: "DELETE_FORM", payload: { fId } });
  } catch (error) {
    dispatch({
      type: "DELETE_FORM_FAILURE",
      payload: error.response,
    });
  }
};
