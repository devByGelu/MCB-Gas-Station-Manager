import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const renderField = ({
  variation,
  options,
  optionsValues,
  input,
  label,
  type,
  step,
  index,
  fields,
  small,
  withAddBtn,
  withDelBtn,
  meta: { touched, error },
}) => {
  const renderBtn = (button, index) => {
    let operation =
      withAddBtn && button === 'add'
        ? '+'
        : withDelBtn && button === 'del'
        ? '-'
        : null
    return operation ? (
      <button
        type='button'
        class={`btn btn-${operation === '+' ? 'success' : 'danger'} btn-sm`}
        onClick={
          operation === '+' ? () => fields.push({}) : () => fields.remove(index)
        }>
        {operation}
      </button>
    ) : (
      <></>
    )
  }

  const hasLabel = () =>
    label ? (
      <div class='input-group-prepend'>
        <span class='input-group-text'>{label}</span>
      </div>
    ) : (
      <></>
    )

  const select = () => (
    <>
      <div className='input-group mb-3 input-group-sm'>
        <div className='input-group-prepend input-group-sm'>
          {label && <label className='input-group-text'>{label}</label>}
        </div>

        <select {...input} class='custom-select form-control form-control-sm'>
          <option value={-1}>-</option>
          {options.map((option, index) => (
            <option value={optionsValues ? optionsValues[index] : option}>
              {option}
            </option>
          ))}
        </select>

        {renderBtn('add', index)}
        {renderBtn('del', index)}
      </div>
      <FormControl variant='outlined' size='small' fullWidth='true' error>
        <InputLabel shrink id="labelId">
          Age
        </InputLabel>

        <Select
        {...input}
          labelId="labelId"
          id="selectId"
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem></Select>
      </FormControl>
    </>
  )

  const stdInput = () => (
    <div class={small ? 'input-group input-group-sm' : 'input-group mb-3'}>
      {hasLabel()} {/* For input with labels */}
      <input
        {...input}
        type={type}
        step={step ? step : 1}
        class='form-control'
        placeholder={input.name}
        id={'props.name'}
      />
      {renderBtn('add', index)}
      {renderBtn('del', index)}
      {/* {touched && error && <span>{'s'+error}</span>} */}
    </div>
  )
  return variation === 'select' ? select() : stdInput()
}

export default renderField
