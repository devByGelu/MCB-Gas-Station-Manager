import jsonPlaceholder from '../apis/jsonPlaceholder'
import EmployeeAPI from '../apis/EmployeeAPI'
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
export const selectPump1ActiveNavLink = (productSelected) => ({
  type: 'PUMP1_SELECTED_PRODUCT',
  payload: {
    product: productSelected,
  },
})
export const selectPump2ActiveNavLink = (productSelected) => ({
  type: 'PUMP2_SELECTED_PRODUCT',
  payload: {
    product: productSelected,
  },
})
export const selectPump3ActiveNavLink = (productSelected) => ({
  type: 'PUMP3_SELECTED_PRODUCT',
  payload: {
    product: productSelected,
  },
})
export const selectPump4ActiveNavLink = (productSelected) => ({
  type: 'PUMP4_SELECTED_PRODUCT',
  payload: {
    product: productSelected,
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

export const addPumpAttendantOnForm = (generatedId) => ({
  type: 'SHIFT_FORM_ADD_PA',
  payload: generatedId,
})

export const removePumpAttendantOnForm = (id) => ({
  type: 'SHIFT_FORM_MIN_PA',
  payload: id,
})

export const updatePumpAttendantOnForm = (selectorId, selected) => ({
  type: 'SHIFT_FORM_UPDATE_PA',
  payload: { selectorId, selected },
})

export const registerMainFormNavLinks = (labels) => ({
  type: 'MAIN_FORM_REGISTER_LINKS',
  payload: labels,
})

export const toggleMainFormNavLink = (label) => ({
  type: 'TOGGLE_MAIN_FORM_NAV_LINK',
  payload: label,
})

export const changeActivePumpTab = (pumpNumIndex, active) => ({
  type: 'CHANGE_ACTIVE_PUMP_TAB',
  payload: {
    pumpNumIndex,
    active,
  },
})

