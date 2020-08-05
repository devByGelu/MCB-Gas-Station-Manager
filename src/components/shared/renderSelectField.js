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

const renderSelectField = ({size='small', input, meta: { touched, error }, children, label, ...custom  }) => (
  <FormControl fullWidth error={touched && error} size={size} margin='dense'>
    <InputLabel id={input.name+'-label'}>{label}</InputLabel>
    <Select labelId={input.name+'-label'} id={input.name+"-id"} {...input}  label={label} {...custom}>
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)
export default renderSelectField
