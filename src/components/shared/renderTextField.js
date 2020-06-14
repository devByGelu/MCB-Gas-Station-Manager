import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const renderTextField = ({
    label,
    type,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

renderTextField.propTypes = {

}

export default renderTextField
