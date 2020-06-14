import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
const dateFormat = require('dateformat')

const submitGroup4 = async (values) => {
  try {
    const dipstick = values.dipstick
    await FormsAPI.post('/group4', {
      fId: '42',
      numOfDrops: values.drops,
      amtPerDrop: values.amountPerDrop,
      lastDrop: values.lastDrop,
      lastDropBreakdown: values.lastDropBreakdown,
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

export default submitGroup4
