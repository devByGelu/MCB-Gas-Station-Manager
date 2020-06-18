import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import employeesReducer from './employeesReducer'
import pumpTabsReducer from './pumpTabsReducer'

export default combineReducers({
  employees: employeesReducer,
  form: formReducer,
  pumpTabs: pumpTabsReducer
})
