import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
import { updateOpenedForm } from '../../actions'

const dateFormat = require('dateformat')
const submitGroup3 = async (values,dispatch,props) => {
  const willCreate = props.openedForm.dipstick_reading_form_fId === null
  if (willCreate) {
    const d = new Date(props.openedForm.date)
    const fId = props.openedForm.fId
    const dipstick = values.dipstick
    try {
      await FormsAPI.post('/group3', {
        fId,
        dipstick
      })
      // Update fetchMonthForms and props.openedForm
      dispatch(updateOpenedForm(d, props.openedForm.placement))
    } catch (error) {
      throw new SubmissionError({_error: 'Failed to submit basic information'})
    }
  } else {
    // await FormsAPI.patch
    alert('Implement edit mode')
  }
}

export default submitGroup3
