import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import shiftFormDateReducer from './shiftFormDateReducer'
import pump1ActiveNavLinkReducer from './pump1ActiveNavLinkReducer'
import pump2ActiveNavLinkReducer from './pump2ActiveNavLinkReducer'
import pump3ActiveNavLinkReducer from './pump3ActiveNavLinkReducer'
import pump4ActiveNavLinkReducer from './pump4ActiveNavLinkReducer'
import employeesReducer from './employeesReducer'
import shiftFormPumpAttendantsReducer from './shiftFormPumpAttendantsReducer'
import registeredMainFormNavLinksReducer from './registeredMainFormNavLinksReducer'
import pumpTabsReducer from './pumpTabsReducer'

export default combineReducers({
  shiftFormDate: shiftFormDateReducer,
  pump1ActiveNavLink: pump1ActiveNavLinkReducer,
  pump2ActiveNavLink: pump2ActiveNavLinkReducer,
  pump3ActiveNavLink: pump3ActiveNavLinkReducer,
  pump4ActiveNavLink: pump4ActiveNavLinkReducer,
  employees: employeesReducer,
  shiftFormPumpAttendants: shiftFormPumpAttendantsReducer,
  form: formReducer,
  registeredMainFormNavLinks:registeredMainFormNavLinksReducer,
  pumpTabs: pumpTabsReducer
})
