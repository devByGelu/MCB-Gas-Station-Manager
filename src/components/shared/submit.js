// import store from '../../store'

import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
const dateFormat = require('dateformat')

const submit = async (values) => {
    // console.log(store.getState())
   alert('Implement submit handler!')
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

export default submit
