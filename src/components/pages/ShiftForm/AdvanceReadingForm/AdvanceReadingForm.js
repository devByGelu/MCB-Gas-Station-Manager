import React from 'react'
import RenderField from './RenderField'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import RenderErrors from '../../../shared/RenderErrors'
import validate from '../../../shared/validate'
// import submit from '../../../shared/submit'
const renderAdvanceReadingForm = ({
  fields,
  rows,
  headers,
  meta: { error, submitFailed },
}) => {
  if (fields.length < 1) headers.forEach(() => fields.push({}))

  return (
    <>
      <table class='table'>
        <thead class='thead-dark'>
          <tr>
            {headers.map((header, index) => (
              <th scope='col'>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr>
              <th scope='row'>{rows[index]}</th>
              <td>
                <Field
                  type={'number'}
                  name={`${field}.diesel`}
                  small={true}
                  step={0.001}
                  component={renderField}
                />
              </td>
              <td>
                <Field
                  type={'number'}
                  component={renderField}
                  name={`${field}.accelrate`}
                  small={true}
                  step={0.001}
                />
              </td>
              <td>
                <Field
                  type={'number'}
                  component={renderField}
                  name={`${field}.jxpremium`}
                  small={true}
                  step={0.001}
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

const AdvanceReadingForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
    <FieldArray
      name='advanceReading'
      headers={['Product', 'Diesel', 'Accelrate', 'Jx Premium']}
      rows={['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4']}
      component={renderAdvanceReadingForm}
    />
    <button type='submit'>submit!g2!</button>
    </form>
  )
}
export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // onSubmit: submit,
  validate
})(AdvanceReadingForm)
