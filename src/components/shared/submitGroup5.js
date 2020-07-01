import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
import { updateOpenedForm } from '../../actions'
const dateFormat = require('dateformat')

const submitGroup5 = async (values,dispatch,props) => {
  const willCreate = props.openedForm.expense_form_fId === null
  if (willCreate) {
    const d = new Date(props.openedForm.date)
    const date = dateFormat(d,'isoDate')
    const fId = props.openedForm.fId
    let data = {}
    console.log(values.creditsales[0].amount)
    if(values.expenses[0].amount) data.expenses = values.expenses 
    if(values.creditsales[0].amount) data.creditsales = values.creditsales 
    if(values.cashadvance[0].amount) data.cashadvance = values.cashadvance 
    data.date = date
    data.fId = fId
    try {
      await FormsAPI.post('/group5', data)
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

export default submitGroup5
