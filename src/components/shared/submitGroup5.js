import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
const dateFormat = require('dateformat')

const submitGroup5 = async (values) => {
  try {
    await FormsAPI.post('/group5', {
      fId: 43,
      expenses: values.expenses,
      date: '2020-06-11',
      creditsales:values.creditsales,
      cashadvance:values.cashadvance
    })
  } catch (error) {
    console.log(error)
  }
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

export default submitGroup5
