import React from 'react'
import PumpInput from './PumpInput'
import PumpSubformNavLink from './PumpSubformNavLink'
import { Field, FieldArray, Fields } from 'redux-form'
import renderField from '../../shared/renderField'
import RenderErrors from '../../shared/RenderErrors'
import { connect } from 'react-redux'
import { getFormSyncErrors, hasSubmitFailed } from 'redux-form'
import { xor } from 'lodash'
import renderTextField from '../../shared/renderTextField'
import PumpTab from '../../shared/PumpTab'
const renderSubFormFields = ({
  fields,
  product,
  // cb,
  meta: { error, submitFailed },
}) => {
  // if (error && submitFailed) cb(error, submitFailed)
  if (fields.length < 1) fields.push({})
  return fields.map((field, index) => {
    const fieldNames = [
      `${field}.${product}END`,
      `${field}.${product}CAL`,
      `${field}.${product}MGN`,
    ]
    const labels = ['END', 'CAL', 'MGN']
    return labels.map((label, index) => (
      <>
        <Field
          name={fieldNames[index]}
          component={renderTextField}
          type='number'
          label={label}
        />
        <br />
      </>
    ))
  })
}
function PumpSubform(props) {
  const { isActive, pumpNumber, submitFailed, formSyncErrors } = props
  const displayErrors = () => {
    if (
      submitFailed &&
      (formSyncErrors.pump1Liters ||
        formSyncErrors.pump2Liters ||
        formSyncErrors.pump3Liters ||
        formSyncErrors.pump4Liters)
    )
      return (
        <RenderErrors
          message={
            pumpNumber == 1 && formSyncErrors.pump1Liters
              ? JSON.stringify(formSyncErrors.pump1Liters._error).replace(
                  /['"]+/g,
                  ''
                )
              : pumpNumber == 2 && formSyncErrors.pump2Liters
              ? JSON.stringify(formSyncErrors.pump2Liters._error).replace(
                  /['"]+/g,
                  ''
                )
              : pumpNumber == 3 && formSyncErrors.pump3Liters
              ? JSON.stringify(formSyncErrors.pump3Liters._error).replace(
                  /['"]+/g,
                  ''
                )
              : pumpNumber == 4 && formSyncErrors.pump4Liters
              ? JSON.stringify(formSyncErrors.pump4Liters._error).replace(
                  /['"]+/g,
                  ''
                )
              : undefined
          }
          direct={true}
        />
      )
    else return <></>
  }
  const labels = ['Diesel', 'Accelrate', 'JxPremium']
  return (
    <React.Fragment>

      <div className='d-none'>
        <div className='card w-100 mb-3'>
          <div class='card text-center'>
            <div class='card-header'>
              <ul class='nav nav-pills card-header-pills'>
                <PumpSubformNavLink label={props.pumpNumber} />
              </ul>
              <ul class='ml-1 nav nav-pills card-header-pills'>
                {labels.map((label) => (
                  <PumpSubformNavLink
                    label={label}
                    isClickAble={true}
                    pumpNumber={props.pumpNumber}
                  />
                ))}
              </ul>
            </div>
            <div class='card-body'>
              {labels.map((label) => (
                <div class={isActive(label)}>
                  <FieldArray
                    component={renderSubFormFields}
                    product={label}
                    name={'pump' + props.pumpNumber + 'Liters'}
                  />
                </div>
              ))}
            </div>
            {/* {JSON.stringify(formSyncErrors.pump1Liters._error)} */}
            {displayErrors()}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    formSyncErrors: getFormSyncErrors('shiftForm')(state),
    submitFailed: hasSubmitFailed('shiftForm')(state),
  }
}
export default connect(mapStateToProps)(PumpSubform)
