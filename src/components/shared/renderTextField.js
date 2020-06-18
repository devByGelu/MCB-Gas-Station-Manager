import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FieldBtn from './FieldBtn'
const iconBtn = (fields, index) => {
  return fields ? <FieldBtn type='add' fields={fields} index={index} /> : <></>
}
const renderTextField = ({
  label,
  placeholder, 
  fields,
  index,
  type,
  input,
  helperText,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl size='small'>
    <TextField
      label={label}
      size='small'
      InputProps={{
        startAdornment: iconBtn(fields, index),
      }}
      // variant='outlined'
      placeholder={placeholder}
      startAdornment={iconBtn(fields, index)}
      error={touched && invalid}
      // helperText={touched && error ? error : helperText ? helperText : ''}
      {...input}
      {...custom}
    />
  </FormControl>
)

renderTextField.propTypes = {}

export default renderTextField
