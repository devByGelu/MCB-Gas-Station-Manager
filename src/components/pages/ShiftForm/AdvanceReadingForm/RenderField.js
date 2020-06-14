import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import nextId from 'react-id-generator'

const RenderField = (props) => {
  
  const renderBtn = (button, index) => {
    let operation =
      props.withAddBtn && button === 'add'
        ? '+'
        : props.withDelBtn && button === 'del'
        ? '-'
        : null
    return operation ? (
      <button
        type='button'
        class={`btn btn-${operation === '+' ? 'success' : 'danger'} btn-sm`}
        onClick={
          operation === '+'
            ? () => props.fields.push({})
            : () => props.fields.remove(index)
        }
      >
        {operation}
      </button>
    ) : (
      <></>
    )
  }
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
    <div
      class={props.small ? 'input-group input-group-sm ' : 'input-group mb-1'}
    >
      {label()}
      <Field
        // key={props.newId}
        component='input'
        type={props.type}
        step={props.step ? props.step : 1}
        class='form-control'
        placeholder={props.name}
        aria-describedby='basic-addon1'
        name={props.name}
        id={props.name}
      />
      {renderBtn('add', props.index)}
      {renderBtn('del', props.index)}
    </div>
  )
}

export default connect()(RenderField)
