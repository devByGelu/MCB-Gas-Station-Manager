import { SubmissionError } from "redux-form"
import FormsAPI from "../../apis/FormsAPI"
import { updateOpenedForm } from "../../actions"
const dateFormat = require("dateformat")

const submitGroup4 = async (values, dispatch, props) => {
  const willCreate = props.openedForm.drop_form_fId === null
  if (willCreate) {
    const d = new Date(props.openedForm.date)
    const fId = props.openedForm.fId
    try {
      await FormsAPI.post("/group4", {
        fId,
        numOfDrops: values.drops,
        amtPerDrop: values.amountPerDrop,
        lastDrop: values.lastDrop,
        lastDropBreakdown: values.lastDropBreakdown,
      })
      // Update fetchMonthForms and props.openedForm
      dispatch(updateOpenedForm(d, props.openedForm.placement))
    } catch (error) {
      throw new SubmissionError({
        _error: "Failed to submit basic information",
      })
    }
  } else {
    // await FormsAPI.patch
    alert("Implement edit mode")
  }
}

export default submitGroup4
