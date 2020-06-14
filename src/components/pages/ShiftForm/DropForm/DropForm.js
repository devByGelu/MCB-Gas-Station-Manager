import React from 'react'
import { Field, Fields, FieldArray, reduxForm } from 'redux-form'
import Table from '../../../shared/Table/Table'
import RenderField from '../AdvanceReadingForm/RenderField'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import renderField from '../../../shared/renderField'
// import RemoteSubmitButton from '../../../shared/RemoteSubmitButton'
// import submit from '../../../shared/submit'
import validate from '../../../shared/validate'
import RenderErrors from '../../../shared/RenderErrors'
import renderSelectField from '../../../shared/renderSelectField'
const renderDropBreakdown = ({
  fields,
  headers,
  meta: { error, submitFailed },
}) => {
  if (fields.length < 1) fields.push({})
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
              <th scope='row'>
                <Field
                  variation={'select'}
                  options={[
                    'Choose...',
                    1000,
                    500,
                    200,
                    100,
                    50,
                    20,
                    10,
                    5,
                    1,
                    0.25,
                  ]}
                  name={`${field}.denomination`}
                  component={renderField}></Field>
              </th>
              <td>
                <Field
                  type={'number'}
                  name={`${field}.quantity`}
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

const renderDropForm = (fields) => {
  return (
    <>
      <table class='table'>
        <thead class='thead-dark'>
          <tr>
            <th scope='col'></th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'># of Drops</th>
            <td>
              <div className='input-group input-group-sm'>
                <input
                  {...fields.drops.input}
                  type='number'
                  className='form-control'
                />
              </div>
            </td>
          </tr>
        </tbody>

        <tr>
          <th scope='row'>Amount/drop</th>
          <td>
            <div className='input-group input-group-sm'>
              <input
                {...fields.amountPerDrop.input}
                type='number'
                className='form-control'
              />
            </div>
          </td>
        </tr>

        <tr>
          <th scope='row'>Last drop</th>
          <td>
            <div className='input-group input-group-sm'>
              <input
                {...fields.lastDrop.input}
                type='number'
                className='form-control'
              />
            </div>
          </td>
        </tr>
      </table>
      <RenderErrors
        errors={[
          fields.drops.meta.touched && fields.drops.meta.error,
          fields.amountPerDrop.meta.touched && fields.amountPerDrop.meta.error,
          fields.lastDrop.meta.touched && fields.lastDrop.meta.error,
        ]}
        errorMessages={[
          fields.drops.meta.error,
          fields.amountPerDrop.meta.error,
          fields.lastDrop.meta.error,
        ]}
      />
    </>
  )
}
const DropForm = (props) => {
  return (
    <>
    <form onSubmit={props.handleSubmit}>
      <div className='row'>
        <div className='col'>
          <Fields
            names={['drops', 'amountPerDrop', 'lastDrop']}
            component={renderDropForm}
          />
        </div>
        <div className='col-md'>
          <FieldArray
            name='lastDropBreakdown'
            headers={['Denomination', 'Quantity']}
            component={renderDropBreakdown}
          />
        </div>
      </div>
      <button type='submit'>submitttt</button>
    </form>
    <Field
          name="favoriteColor"
          id="fav2"
          component={renderSelectField}
          label="Favorite Color"
        >
          <option value="" />
          <option value={'ff0000'}>Red</option>
          <option value={'00ff00'}>Green</option>
          <option value={'0000ff'}>Blue</option>
        </Field>
    </>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  // onSubmit: submit,
})(DropForm)
