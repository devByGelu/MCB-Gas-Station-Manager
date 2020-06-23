import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
import store from '../../store'
import { fetchMonthForms, openForm } from '../../actions'
import { openedForm } from '../../states/openedForm'
import { monthForms } from '../../states/monthForms'

const dateFormat = require('dateformat')
const submitGroup3 = async (values) => {
  const willCreate = openedForm.dipstick_reading_form_fId === null
  if (willCreate) {
    const d = new Date(openedForm.date)
    const fId = openedForm.fId
    const dipstick = values.dipstick
    try {
      await FormsAPI.post('/group3', {
        fId,
        dipstick
      })
      // Update fetchMonthForms and openedForm
      await store.dispatch(
        fetchMonthForms(dateFormat(d, 'yyyy'), dateFormat(d, 'm'))
      )
      store.dispatch(
        openForm(
          monthForms.results.find(
            (form) =>
              openedForm.date === form.date &&
              openedForm.placement === form.placement
          )
        )
      )
    } catch (error) {
      throw new SubmissionError({_error: 'Failed to submit basic information'})
    }
  } else {
    // await FormsAPI.patch
    alert('Implement edit mode')
  }
}

export default submitGroup3
