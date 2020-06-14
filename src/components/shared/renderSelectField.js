import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from '@material-ui/core'

import FieldBtn from './FieldBtn'

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}
const iconBtn = (fields,index) => {
  return fields ? (
    <InputAdornment position='start'>
      <FieldBtn type='add' fields={fields} index={index} />
    </InputAdornment>
  ) : (
    <></>
  )
}

const renderSelectField = ({
  input,
  id,
  label,
  fields,
  index,
  meta: { touched, error },
  children,
}) => (
  <>
    <FormControl error={touched && error} fullWidth='true'>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select native {...input} startAdornment={iconBtn(fields,index)}>
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  </>
)
export default renderSelectField
