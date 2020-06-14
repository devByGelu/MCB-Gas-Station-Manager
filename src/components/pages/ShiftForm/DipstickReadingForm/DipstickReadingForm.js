import React, { Component, useEffect } from 'react'
import RenderField from '../AdvanceReadingForm/RenderField'
import Table from '../../../shared/Table/Table'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import RenderErrors from '../../../shared/RenderErrors'
import validate from '../../../shared/validate'
// import submit from '../../../shared/submit'
const renderDipstickReadingForm = ({
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
                  name={`${field}.openingLevel`}
                  component={renderField}
                  small={true}
                  label='LEVEL'
                />

                <Field
                  type={'number'}
                  name={`${field}.openingLiters`}
                  component={renderField}
                  step={0.01}
                  small={true}
                  label='LITERS'
                />
              </td>

              <td>
                <Field
                  type={'number'}
                  name={`${field}.closingLevel`}
                  component={renderField}
                  small={true}
                  label='LEVEL'
                />
                <Field
                  type={'number'}
                  name={`${field}.closingLiters`}
                  component={renderField}
                  step={0.01}
                  small={true}
                  label='LITERS'
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
export const DipstickReadingForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray
        name='dipstick'
        headers={['Product', 'Opening', 'Closing']}
        rows={['Diesel', 'Accelrate', 'Jx Premium']}
        component={renderDipstickReadingForm}
      />
      <button type='submit'>submit!!!</button>
    </form>
  )
}
export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
  // onSubmit: submit,
})(DipstickReadingForm)
