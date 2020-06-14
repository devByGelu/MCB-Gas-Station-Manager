import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'
import RenderErrors from '../../../shared/RenderErrors'
import FormHeader from '../../../shared/FormHeader/FormHeader'

const renderCreditSales = ({ fields, meta: { error, submitFailed } }) => {
  if (fields.length < 1) fields.push({})
  return (
    <>
      <table class='table'>
        <thead class='thead-light'>
          <tr>
            <th scope='col'>Customer</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((creditsale, index) => (
            <tr>
              <th scope='row'>
                <Field
                  name={`${creditsale}.customer`}
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
                  name={`${creditsale}.amount`}
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
const CreditSalesForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error } = props
  return (
    <>
      <FieldArray name='creditsales' component={renderCreditSales} />
    </>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(CreditSalesForm)
