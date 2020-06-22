import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import employeesReducer from './employeesReducer'
import pumpTabsReducer from './pumpTabsReducer'
import formSelectedMonthReducer from './formSelectedMonthReducer.js'
import monthFormsReducer from './monthFormsReducer'
import selectedDayReducer from './selectedDayReducer'
import selectedDaySeletedDaySelectedFormReducer from './selectedDaySelectedFormReducer'
import openedFormReducer from './openedFormReducer'
export default combineReducers({
  employees: employeesReducer,
  form: formReducer,
  pumpTabs: pumpTabsReducer,
  formMonth: formSelectedMonthReducer,
  monthForms: monthFormsReducer,
  selectedDay: selectedDayReducer,
  selectedDaySelectedForm: selectedDaySeletedDaySelectedFormReducer,
  openedForm: openedFormReducer
})
