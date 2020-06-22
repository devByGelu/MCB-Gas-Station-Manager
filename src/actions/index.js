import jsonPlaceholder from '../apis/jsonPlaceholder'
import EmployeeAPI from '../apis/EmployeeAPI'
import FormAPI from '../apis/FormAPI'
import FormsAPI from '../apis/FormsAPI'
export const fetch = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts')
  dispatch({ type: 'wawda', payload: response })
}

export const selectShiftFormDate = (selectedDate, selectedShift) => ({
  type: 'SHIFTFORM_DATE_SELECTED',
  payload: {
    date: selectedDate,
    shift: selectedShift,
  },
})

export const fetchEmployees = () => async (dispatch) => {
  dispatch({
    type: 'FETCH_EMPLOYEES_REQUEST',
  })
  try {
    const response = await EmployeeAPI.get('/')
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: response.data })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: error.response,
    })
  }
}
export const fetchMonthForms = (year, month) => async (dispatch) => {
  dispatch({
    type: 'FETCH_MONTH_FORMS_REQUEST',
  })

  try {
    const response = await FormsAPI.get(`/${year}/${month}`)
    console.log(response)
    dispatch({ type: 'FETCH_MONTH_FORMS_SUCCESS', payload: response.data })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: 'FETCH_MONTH_FORMS_FAILURE',
      payload: error.response,
    })
  }
}

export const changeActivePanel = (pumpNumIndex, active) => ({
  type: 'CHANGE_ACTIVE_PANEL',
  payload: {
    pumpNumIndex,
    active,
  },
})
export const changeSelectedDay = (day) => ({
  type: 'CHANGE_SELECTED_DAY',
  payload: {
    day,
  },
})
export const changeSelectedDaySelectedForm = (placement) => ({
  type: 'CHANGED_SELECTED_DAY_SELECTED_FORM',
  payload: {
    placement,
  },
})

export const openForm = (form) => ({
  type: 'OPEN_FORM',
  payload: {
    form,
  },
})
