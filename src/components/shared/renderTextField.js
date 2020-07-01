import React from "react"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import FieldBtn from "./FieldBtn"
const iconBtn = (fields, index) => {
  return fields ? <FieldBtn type='add' fields={fields} index={index} /> : <></>
}
const renderTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl size='small' fullWidth margin='normal'>
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
)

renderTextField.propTypes = {}

export default renderTextField
