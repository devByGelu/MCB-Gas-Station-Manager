import { SubmissionError } from "redux-form"
import FormsAPI from "../../apis/FormsAPI"
import store from "../../store"
import { fetchMonthForms, openForm } from "../../actions"
import { openedForm } from "../../states/openedForm"
import { monthForms } from "../../states/monthForms"
import FormAPI from "../../apis/FormAPI"

const dateFormat = require("dateformat")

const submitForm = async (values, dispatch, props) => {
  const fields = ["placement", "shift"]
  let error = {}
  fields.forEach((field) => {
    if (!values[field]) {
      error[field] = "Required"
      throw new SubmissionError(error)
    }
  })
  try {
    dispatch({
      type: "POST_FORM_REQUEST",
    })
    const response = await FormAPI.post("/", {
      year: 2020,
      month: 6,
      day: 1,
      placement: values.placement,
      eId: 2,
      shift: values.shift,
    })
    dispatch({ type: "POST_FORM_SUCCESS", payload: response.data[0] })
    dispatch({
      type: "APPEND_FORM",
      payload: response.data[0]
    })
  } catch (error) {
    dispatch({
      type: "POST_FORM_FAILURE",
      payload: error.response,
    })
    throw new SubmissionError({
      _error: "Failed to create shift form",
    })
  }
}

export default submitForm
