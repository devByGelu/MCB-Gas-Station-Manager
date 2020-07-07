import jsonPlaceholder from "../apis/jsonPlaceholder";
import EmployeeAPI from "../apis/EmployeeAPI";
import FormAPI from "../apis/FormAPI";
import FormsAPI from "../apis/FormsAPI";
import formInit from "../components/pages/ShiftForm/formInit";
import ExpenseCategoryAPI from "../apis/ExpenseCategoryAPI";
import ProductAPI from "../apis/ProductAPI";
import CustomerAPI from "../apis/CustomerAPI";
const dateFormat = require("dateformat");
export const fetchFormData = () => async (dispatch) => {
  dispatch({
    type: "FETCH_FORM_DATA_REQUEST",
  });
  try {
    const response1 = await EmployeeAPI.get("/");
    const response2 = await ExpenseCategoryAPI.get("/");
    const response3 = await CustomerAPI.get("/");
    const response4 = await ProductAPI.get("/");
    dispatch({
      type: "FETCH_FORM_DATA_SUCCESS",
      payload: {
        employees: response1.data,
        expenseCategories: response2.data,
        customers: response3.data,
        products: response4.data,
      },
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: "FETCH_FORM_DATA_FAILURE",
      payload: error.response,
    });
  }
};
export const fetchFormInitialValues = (fId, openedForm) => async (dispatch) => {
  dispatch({
    type: "FORM_INITIAL_VALUES_REQUEST",
  });
  try {
    const {
      attendance_form_fId,
      advance_reading_form_fId,
      dipstick_reading_form_fId,
      drop_form_fId,
      expense_form_fId,
    } = openedForm;
    let basicInfo, advanceReading, dipstickReading, dropForm, expenseForm;
    let formInitVals = formInit();
    let payload = {
      ...formInitVals,
    };

    if (attendance_form_fId != null) {
      basicInfo = await FormsAPI.get("/group1", {
        params: {
          fId,
        },
      });
      payload = { ...payload, ...basicInfo.data };
    }
    if (advance_reading_form_fId != null) {
      advanceReading = await FormsAPI.get("/group2", {
        params: {
          fId,
        },
      });
      payload = { ...payload, ...advanceReading.data };
    }
    if (dipstick_reading_form_fId != null) {
      dipstickReading = await FormsAPI.get("/group3", {
        params: {
          fId,
        },
      });

      payload = { ...payload, ...dipstickReading.data };
    }
    if (drop_form_fId != null) {
      dropForm = await FormsAPI.get("/group4", {
        params: {
          fId,
        },
      });
      payload = { ...payload, ...dropForm.data };
    }
    if (expense_form_fId != null) {
      expenseForm = await FormsAPI.get("/group5", {
        params: {
          fId,
        },
      });
      payload = { ...payload, ...expenseForm.data };
    }

    dispatch({
      type: "FORM_INITIAL_VALUES_SUCCESS",
      payload: payload,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
    dispatch({
      type: "FORM_INITIAL_VALUES_FAILURE",
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
    const response = await FormsAPI.get(`/${year}/${month}`);
    dispatch({ type: "FETCH_MONTH_FORMS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error.response);
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
export const changeSelectedDay = (day) => ({
  type: "CHANGE_SELECTED_DAY",
  payload: {
    day,
  },
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
