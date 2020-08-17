import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import employeesReducer from "./employeesReducer"
import pumpTabsReducer from "./pumpTabsReducer"
import monthFormsReducer from "./monthFormsReducer"
import selectedDayReducer from "./selectedDayReducer"
import selectedDaySeletedDaySelectedFormReducer from "./selectedDaySelectedFormReducer"
import openedFormReducer from "./openedFormReducer"
import activeTabNavReducer from "../components/pages/ShiftForm/MainForm/MainTabNav/activeTabNavReducer"
import postFormReducer from "./postFormReducer"
import createFormDialogReducer from "./createFormDialogReducer"
import basicInfoReducer from "../components/shared/basicInfoReducer"
import formInitialValuesReducer from "../components/shared/formInitialValuesReducer"
import fetchFormDataReducer from "./fetchFormDataReducer"
import expandedDrawerItemsReducers from "./expandedDrawerItemsReducers"
import pumpInfoFieldsReducer from "./pumpInfoFieldsReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import authFormReducer from "./authFormReducer"
import errorSnackBarReducer from "./errorSnackBarReducer"
export default combineReducers({
  employees: employeesReducer,
  form: formReducer,
  pumpTabs: pumpTabsReducer,
  monthForms: monthFormsReducer,
  selectedDay: selectedDayReducer,
  selectedDaySelectedForm: selectedDaySeletedDaySelectedFormReducer,
  openedForm: openedFormReducer,
  activeTabNav: activeTabNavReducer,
  createFormStatus: postFormReducer,
  createFormDialog: createFormDialogReducer,
  formBasicInformation: basicInfoReducer,
  formInitialValues: formInitialValuesReducer,
  formData: fetchFormDataReducer,
  expandableDrawerItems: expandedDrawerItemsReducers,
  pumpInfoFields: pumpInfoFieldsReducer,
  errors: errorReducer,
  auth: authReducer,
  authForm: authFormReducer,
  errorSnackBar: errorSnackBarReducer,
})
