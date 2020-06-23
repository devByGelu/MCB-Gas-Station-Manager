import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
import store from '../../store'
import { fetchMonthForms, openForm } from '../../actions'
import { openedForm } from '../../states/openedForm'
import { monthForms } from '../../states/monthForms'
const dateFormat = require('dateformat')

const submitGroup4 = async (values) => {
  
  const willCreate = openedForm.drop_form_fId === null
  if (willCreate) {
    const d = new Date(openedForm.date)
    const fId = openedForm.fId
    try {
      await FormsAPI.post('/group4', {
        fId,
      numOfDrops: values.drops,
      amtPerDrop: values.amountPerDrop,
      lastDrop: values.lastDrop,
      lastDropBreakdown: values.lastDropBreakdown,
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

export default submitGroup4
