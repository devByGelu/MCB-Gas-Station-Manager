import jsonPlaceholder from "../apis/jsonPlaceholder"
import EmployeeAPI from "../apis/EmployeeAPI"
import FormAPI from "../apis/FormAPI"
import FormsAPI from "../apis/FormsAPI"
import formInit from "../components/pages/ShiftForm/formInit"
export const closeForm = () => ({
  type: "CLOSE_FORM",
})
export const fetchBasicInformation = (fId) => async (dispatch) => {
  dispatch({
    type: "FETCH_BASIC_INFO_REQUEST",
  })
  try {
    const response = await FormsAPI.get("/group1",{params:{
      fId
    }})
    let formInitVals = formInit() 
    dispatch({ type: "FETCH_BASIC_INFO_SUCCESS", payload: {...formInitVals,...response.data} })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: "FETCH_BASIC_INFO_FAILURE",
      payload: error.response,
    })
  }
}
export const fetch = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts")
  dispatch({ type: "wawda", payload: response })
}

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

export const fetchEmployees = () => async (dispatch) => {
  dispatch({
    type: "FETCH_EMPLOYEES_REQUEST",
  })
  try {
    const response = await EmployeeAPI.get("/")
    dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: response.data })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: "FETCH_EMPLOYEES_FAILURE",
      payload: error.response,
    })
  }
}
export const fetchMonthForms = (year, month) => async (dispatch) => {
  dispatch({
    type: "FETCH_MONTH_FORMS_REQUEST",
  })

  try {
    const response = await FormsAPI.get(`/${year}/${month}`)
    dispatch({ type: "FETCH_MONTH_FORMS_SUCCESS", payload: response.data })
    if (!response.data[0]) {
      dispatch({
        type: "POST_FORM_REQUEST",
      })
      try {
        const response1 = await FormAPI.post("/", {
          year,
          month,
          day: 1,
          placement: 1,
          eId: 2,
          shift: "AM",
        })
        dispatch({ type: "POST_FORM_SUCCESS", payload: response1.data })
        dispatch({
          type: "APPEND_FORM",
          payload: {
            fId: response1.data.insertId,
            placement: 1,
            eId: 2,
            shift: "AM",
            date: new Date(`${year}-${month}-1`),
            attendance_form_fId: null,
            expense_form_fId: null,
            drop_form_fId: null,
            advance_reading_form_fId: null,
            dipstick_reading_form_fId: null,
          },
        })
      } catch (error) {
        dispatch({
          type: "POST_FORM_FAILURE",
          payload: error.response,
        })
      }
    }
  } catch (error) {
    console.log(error.response)
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
export const changeSelectedDay = (day) => ({
  type: "CHANGE_SELECTED_DAY",
  payload: {
    day,
  },
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

export const submitform = (year, month, day, placement, eId, shift) => async (
  dispatch
) => {
  dispatch({
    type: "POST_FORM_REQUEST",
  })
  try {
    const response1 = await FormAPI.post("/", {
      year,
      month,
      day,
      placement,
      eId,
      shift,
    })
    dispatch({ type: "POST_FORM_SUCCESS", payload: response1.data })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: "POST_FORM_FAILURE",
      payload: error.response,
    })
  }
}
// Action used when all forms' id are null
export const postFormRequest = (
  year,
  month,
  day,
  placement,
  eId,
  shift
) => async (dispatch) => {
  let firstResponse = {}
  dispatch({
    type: "POST_FORM_REQUEST",
  })
  try {
    const response = await FormAPI.post("/", {
      year,
      month,
      day,
      placement,
      eId,
      shift,
    })
    dispatch({ type: "POST_FORM_SUCCESS", payload: response.data })
    dispatch({
      type: "APPEND_FORM",
      payload: response.data[0],
    })
  } catch (error) {
    dispatch({
      type: "POST_FORM_FAILURE",
      payload: error.response,
    })
  }
}

export const deleteForm = (fId) => async (dispatch) => {
  dispatch({
    type: "DELETE_FORM_REQUEST",
  })

  try {
    const response = await FormAPI.delete(`/${fId}`)
    dispatch({ type: "DELETE_FORM_SUCCESS", payload: response.data })
    dispatch({ type: "DELETE_FORM", payload: { fId } })
  } catch (error) {
    dispatch({
      type: "DELETE_FORM_FAILURE",
      payload: error.response,
    })
  }
}
