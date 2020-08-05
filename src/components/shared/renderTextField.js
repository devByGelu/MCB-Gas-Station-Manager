import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FieldBtn from "./FieldBtn";
const renderTextField = ({
  formData,
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl size="small" fullWidth={true} margin="dense">
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
);

export default renderTextField;
