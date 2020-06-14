import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'
import RenderErrors from '../../../shared/RenderErrors'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import CreditSalesForm from './CreditSalesForm'
import { connect } from 'react-redux'

const renderCashAdvance = ({
  employees,
  fields,
  meta: { error, submitFailed },
}) => {
  if (fields.length < 1) fields.push({})
  return (
    <>
      <table class='table'>
        <thead class='thead-light'>
          <tr>
            <th scope='col'>Employee</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((ca, index) => (
            <tr>
              <th scope='row'>
                <Field
                  variation={'select'}
                  optionsValues={employees.results.map(
                    (employee) => employee.eId
                  )}
                  options={employees.results.map(
                    (employee) => employee.eFN + ' ' + employee.eLN
                  )}
                  label='Employee'
                  name={`${ca}.employee`}
                  component={renderField}></Field>
                {/* <Field
                  name={`${ca}.employee`}
                  type='text'
                  component={renderField}
                  index={index}
                  fields={fields}
                  small={true}
                /> */}
              </th>
              <td>
                <Field
                  type={'number'}
                  name={`${ca}.amount`}
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
const CashAdvanceForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error } = props
  return (
    <>
      <FieldArray
        name='cashadvance'
        component={renderCashAdvance}
        employees={props.employees}
      />
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'shiftForm',
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    validate,
  })(CashAdvanceForm)
)
