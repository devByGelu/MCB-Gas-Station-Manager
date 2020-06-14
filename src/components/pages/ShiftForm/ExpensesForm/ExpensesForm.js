import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'
import RenderErrors from '../../../shared/RenderErrors'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import CreditSalesForm from './CreditSalesForm'
import CashAdvanceForm from './CashAdvanceForm'
import SaveBtn from '../../../shared/SaveBtn'

const renderExpenses = ({ fields, meta: { error, submitFailed } }) => {
  if (fields.length < 1) fields.push({})
  return (
    <>
      <table class='table'>
        <thead class='thead-light'>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((expense, index) => (
            <tr>
              <th scope='row'>
                <Field
                  name={`${expense}.description`}
                  type='text'
                  component={renderField}
                  index={index}
                  fields={fields}
                  small={true}
                />
              </th>
              <td>
                <Field
                  type={'number'}
                  name={`${expense}.amount`}
                  step={0.01}
                  small={true}
                  component={renderField}
                  withDelBtn={index === 0 ? false : true}
                  withAddBtn={index === 0 ? true : false}
                  index={index}
                  fields={fields}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RenderErrors errors={[submitFailed && error]} errorMessages={[error]} />
    </>
  )
}
const ExpensesForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <FormHeader text='Utilities / Daily Expenses' />
          <FieldArray name='expenses' component={renderExpenses} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md'>
          <FormHeader text='Credit Sales' />
          <CreditSalesForm />
        </div>
        <div className='col-md'>
          <FormHeader text='Cash Advance' />
          <CashAdvanceForm />
        </div>
      </div>
      <button type='submit'>submittas</button>
      <SaveBtn/>
    </form>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(ExpensesForm)
