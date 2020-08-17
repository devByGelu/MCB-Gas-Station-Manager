import formInit from "../components/pages/ShiftForm/formInit"
import { useAuthAPI, useShiftFormAPI } from "../apis"

const dateFormat = require("dateformat")
const AuthAPI = useAuthAPI()
const ShiftFormAPI = useShiftFormAPI()
export const switchErrorSnackBar = (toggle) => ({
  type: "SWITCH_ERROR_SNACK_BAR",
  payload: toggle,
})
export const toggleSignInMode = () => ({ type: "TOGGLE_SIGN_IN_MODE" })
export const logOutUser = () => ({ type: "LOGOUT_SUCCESS" })
export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: "USER_LOADING",
  })
  // Getting token
  try {
    const response = await AuthAPI.get("/user")
    dispatch({ type: "USER_LOADED", payload: response.data })
  } catch (error) {
    if (!error.response) return dispatch({ type: "AUTH_ERROR" })
    else {
      const { data, status, message } = error.response
      dispatch(returnErrors(data, status, message))
      dispatch({ type: "AUTH_ERROR" })
    }
  }
}
export const returnErrors = (msg, status, id = null) => ({
  type: "GET_ERRORS",
  payload: { msg, status, id },
})
export const clearErrors = () => ({
  type: "CLEAR_ERRORS",
})
export const togglePumpInfoField = (number, field, product, switchSet) => ({
  type: "TOGGLE_PUMP_INFO_FIELD",
  payload: { number, field, product, switchSet },
})
export const fetchFormData = (year, month, day, shift, placement) => async (
  dispatch
) => {
  dispatch({
    type: "FETCH_FORM_DATA_REQUEST",
  })
  try {
    const response = await ShiftFormAPI.get(
      `/${year}/${month}/${day}/${shift}`,
      { params: { placement } }
    )
    dispatch({
      type: "FETCH_FORM_DATA_SUCCESS",
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: "FETCH_FORM_DATA_FAILURE",
      payload: error.response,
    })
  }
}
export const closeForm = () => ({
  type: "CLOSE_FORM",
})
export const toggleShiftFormEditMode = () => ({
  type: "TOGGLE_SHIFT_FORM_EDIT_MODE",
})
export const toggleCreateFormDialog = () => ({
  type: "TOGGLE_CREATE_FORM_DIALOG",
})
export const changeActiveTabNav = (tabIndex) => ({
  type: "CHANGE_ACTIVE_TAB",
  payload: {
    tabIndex,
  },
})
export const selectShiftFormDate = (selectedDate, selectedShift) => ({
  type: "SHIFTFORM_DATE_SELECTED",
  payload: {
    date: selectedDate,
    shift: selectedShift,
  },
})

export const fetchMonthForms = (year, month) => async (dispatch) => {
  dispatch({
    type: "FETCH_MONTH_FORMS_REQUEST",
  })

  try {
    const response = await ShiftFormAPI.get(`/${year}/${month}`)
    dispatch({
      type: "FETCH_MONTH_FORMS_SUCCESS",
      payload: { results: response.data, year, month },
    })
  } catch (error) {
    dispatch({
      type: "FETCH_MONTH_FORMS_FAILURE",
      payload: error.response,
    })
  }
}

export const changeActivePanel = (pumpNumIndex, active) => ({
  type: "CHANGE_ACTIVE_PANEL",
  payload: {
    pumpNumIndex,
    active,
  },
})
export const resetFormData = () => ({
  type: "RESET_FORM_DATA",
})
export const changeSelectedDate = (date) => ({
  type: "CHANGE_SELECTED_DATE",
  payload: date,
})

export const changeSelectedDaySelectedForm = (placement) => ({
  type: "CHANGED_SELECTED_DAY_SELECTED_FORM",
  payload: {
    placement,
  },
})

export const openForm = (form) => ({
  type: "OPEN_FORM",
  payload: {
    form,
  },
})
export const reinitializeFormData = (values) => ({
  type: "REINITIALIZE_FORM_DATA",
  payload: values,
})

export const setShiftFormCreated = (fId) => ({
  type: "SHIFT_FORM_CREATED",
  payload: fId,
})
export const toggleMenuItem = (index) => ({
  type: "TOGGLE_MENU_ITEM",
  payload: index,
})
// Action used when all forms' id are null
