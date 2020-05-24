import React from 'react'
import { Field } from 'redux-form'
const RenderField = (props) => {
  const label = () =>
    props.label ? (
      <div class='input-group-prepend'>
        <span class='input-group-text' id='basic-addon1'>
          {props.label}
        </span>
      </div>
    ) : (
      <></>
    )
  return (
    <div class='input-group mb-3'>
      {label()}
      <Field
        component='input'
        type={props.type}
        step={props.step ? props.step : ''}
        class='form-control'
        placeholder={props.name}
        aria-describedby='basic-addon1'
        name={props.name}
        id={props.name}
      />
    </div>
  )
}

export default RenderField
