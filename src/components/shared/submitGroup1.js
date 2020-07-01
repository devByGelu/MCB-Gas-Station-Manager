import { SubmissionError } from 'redux-form'
import FormsAPI from '../../apis/FormsAPI'
import { updateOpenedForm } from '../../actions'
const dateFormat = require('dateformat')

const submitGroup1 = async (values,dispatch,props) => {
  console.log(props)
  const employees = [
    ...values.pumpAttendants.map((e) => ({ eId: e.PA, role: 'attendant' })),
    { eId: values.Cashier, role: 'cashier' },
  ]
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
  const willCreate = props.openedForm.attendance_form_fId === null
  if (willCreate) {
    const d = new Date(props.openedForm.date)
    let fId = props.openedForm.fId
    let placement = props.openedForm.placement
    let shift = props.openedForm.shift
    let date = dateFormat(d, 'isoDate')
    try {
      await FormsAPI.post('/group1', {
        fId,
        placement,
        shift,
        date,
        employees,
        pumpPrices: values.pumpPrices,
        pumpLiters,
      })
      // Un-null fIds
      dispatch(updateOpenedForm(d,placement))
    } catch (error) {
      throw new SubmissionError({_error: 'Failed to submit basic information'})
    }
  } else {
    // await FormsAPI.patch
    alert('Implement edit mode')
  }
}

export default submitGroup1
