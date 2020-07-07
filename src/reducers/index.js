import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import employeesReducer from "./employeesReducer";
import pumpTabsReducer from "./pumpTabsReducer";
import monthFormsReducer from "./monthFormsReducer";
import selectedDayReducer from "./selectedDayReducer";
import selectedDaySeletedDaySelectedFormReducer from "./selectedDaySelectedFormReducer";
import openedFormReducer from "./openedFormReducer";
import activeTabNavReducer from "../components/pages/ShiftForm/MainForm/MainTabNav/activeTabNavReducer";
import postFormReducer from "./postFormReducer";
import createFormDialogReducer from "./createFormDialogReducer";
import basicInfoReducer from "../components/shared/basicInfoReducer";
import formInitialValuesReducer from "../components/shared/formInitialValuesReducer";
import fetchFormDataReducer from "./fetchFormDataReducer";
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
});
