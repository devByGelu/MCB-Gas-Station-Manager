import React from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from "@material-ui/core"

import FieldBtn from "./FieldBtn"

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({ input, meta: { touched, error }, children, label, ...custom  }) => (
  <FormControl fullWidth error={touched && error} size='small' margin='normal'>
    <InputLabel id={input.name}>{label}</InputLabel>
    <Select labelId={input.name} {...input} label={label} {...custom}>
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)
export default renderSelectField
