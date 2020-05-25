import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import nextId from 'react-id-generator'

const RenderField = (props) => {
  const renderBtn = (button, id) => {
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
            ? () => props.fields.push({ id: nextId() })
            : () => {
                props.fields.remove(props.fields.pop())
                console.log(id + ' was removed')
              }
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

  if (props.multipleInputs)
    return (
      <div class='input-group'>
        <div class='input-group-prepend'>
          <span class='input-group-text' id=''>
            LV - L
          </span>
        </div>
        <Field
          component='input'
          type={props.type}
          class='form-control'
          placeholder={props.name + '-LEVEL'}
          aria-describedby='basic-addon1'
          name={props.name + '-LEVEL'}
          id={props.name + '-LEVEL'}
        />
        <Field
          component='input'
          type={props.type}
          step={props.step ? props.step : ''}
          class='form-control'
          placeholder={props.name + '-LITERS'}
          aria-describedby='basic-addon1'
          name={props.name + '-LITERS'}
          id={props.name + '-LITERS'}
        />
      </div>
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
        step={props.step ? props.step : ''}
        class='form-control'
        placeholder={props.name}
        aria-describedby='basic-addon1'
        name={props.name}
        id={props.name}
      />
      {renderBtn('add', props.fieldId)}
      {renderBtn('del', props.fieldId)}
    </div>
  )
}

export default connect()(RenderField)
