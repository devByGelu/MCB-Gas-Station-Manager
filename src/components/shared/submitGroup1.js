import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
const dateFormat = require('dateformat')

const submitGroup1 = async (values) => {
  let date = dateFormat(new Date(), 'isoDate')

  const employees = [
    ...values.pumpAttendants.map((e) => ({ eId: e.PA, role: 'attendant' })),
    { eId: values.Cashier, role: 'cashier' },
  ]
  // const pumpLiters = [
  //   ...values.pump1Liters,
  //   ...values.pump2Liters,
  //   ...values.pump3Liters,
  //   ...values.pump4Liters,
  // ]

  const pumpLiters = [
    {
      DieselEND: values.pump1DieselEND,
      DieselCAL: values.pump1DieselCAL,
      DieselMGN: values.pump1DieselMGN,
      AccelrateEND: values.pump1AccelrateEND,
      AccelrateCAL: values.pump1AccelrateCAL,
      AccelrateMGN: values.pump1AccelrateMGN,
      JxPremiumEND: values.pump1JxPremiumEND,
      JxPremiumCAL: values.pump1JxPremiumCAL,
      JxPremiumMGN: values.pump1JxPremiumMGN,
    },
    {
      DieselEND: values.pump2DieselEND,
      DieselCAL: values.pump2DieselCAL,
      DieselMGN: values.pump2DieselMGN,
      AccelrateEND: values.pump2AccelrateEND,
      AccelrateCAL: values.pump2AccelrateCAL,
      AccelrateMGN: values.pump2AccelrateMGN,
      JxPremiumEND: values.pump2JxPremiumEND,
      JxPremiumCAL: values.pump2JxPremiumCAL,
      JxPremiumMGN: values.pump2JxPremiumMGN,
    },
    {
      DieselEND: values.pump3DieselEND,
      DieselCAL: values.pump3DieselCAL,
      DieselMGN: values.pump3DieselMGN,
      AccelrateEND: values.pump3AccelrateEND,
      AccelrateCAL: values.pump3AccelrateCAL,
      AccelrateMGN: values.pump3AccelrateMGN,
      JxPremiumEND: values.pump3JxPremiumEND,
      JxPremiumCAL: values.pump3JxPremiumCAL,
      JxPremiumMGN: values.pump3JxPremiumMGN,
    },
    {
      DieselEND: values.pump4DieselEND,
      DieselCAL: values.pump4DieselCAL,
      DieselMGN: values.pump4DieselMGN,
      AccelrateEND: values.pump4AccelrateEND,
      AccelrateCAL: values.pump4AccelrateCAL,
      AccelrateMGN: values.pump4AccelrateMGN,
      JxPremiumEND: values.pump4JxPremiumEND,
      JxPremiumCAL: values.pump4JxPremiumCAL,
      JxPremiumMGN: values.pump4JxPremiumMGN,
    },
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
