import { SubmissionError } from "redux-form"
import FormsAPI from "../../apis/FormsAPI"
import { updateOpenedForm } from "../../actions"
const dateFormat = require("dateformat")

const submitGroup2 = async (values, dispatch, props) => {
  const willCreate = props.openedForm.advance_reading_form_fId === null
  if (willCreate) {
    const d = new Date(props.openedForm.date)
    let fId = props.openedForm.fId
    let placement = props.openedForm.placement
    let date = dateFormat(d, "isoDate")
    let advanceReading = values.advanceReading
    try {
      await FormsAPI.post("/group2", {
        fId,
        placement,
        date,
        advanceReading,
      })
      dispatch(updateOpenedForm(d, placement))
    } catch (error) {
      throw new SubmissionError({
        _error: "Failed to submit basic information",
      })
    }
  } else {
    // await FormsAPI.patch
    alert("Implement edit mode")
  }
  // try {
  //   const advanceReading = values.advanceReading
  //   await FormsAPI.post('/group2', {
  //     fId: 42,
  //     placement: 2,
  //     date: '2020-06-10',
  //     advanceReading
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
  /* if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    } */
}

export default submitGroup2
