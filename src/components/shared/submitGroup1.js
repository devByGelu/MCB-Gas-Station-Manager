import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
const dateFormat = require('dateformat')

const submitGroup1 = async (values) => {
  let date = dateFormat(new Date(), 'isoDate')

  const employees = [
    ...values.pumpAttendants.map((e) => ({ eId: e.PA, role: 'attendant' })),
    { eId: values.Cashier, role: 'cashier' },
  ]
  const pumpLiters = [
    ...values.pump1Liters,
    ...values.pump2Liters,
    ...values.pump3Liters,
    ...values.pump4Liters,
  ]

  try {
    await FormsAPI.post('/group1', {
      eId: 2,
      placement: 2,
      date,
      employees,
      pumpPrices: values.pumpPrices,
      pumpLiters,
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

export default submitGroup1
