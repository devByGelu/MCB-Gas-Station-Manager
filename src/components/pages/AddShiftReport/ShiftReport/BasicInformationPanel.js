import React, { Component } from "react"
import { connect } from "react-redux"
import FormCard from "./FormCard"
import { Field, FieldArray, reduxForm } from "redux-form"
import { MenuItem, Grid, List, ListItem, Paper } from "@material-ui/core"
import renderSelectField from "../../../shared/renderSelectField"
import renderTextField from "../../../shared/renderTextField"
import nextId from "react-id-generator"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import AddOutlinedIcon from "@material-ui/icons/AddOutlined"
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined"
const renderPumpAttendants = ({ fields, meta: { error, submitFailed } }) => (
  <>
    {fields.map((field, index) => (
      <Grid item md={12} key={nextId()}>
        <Field
          key={nextId()}
          name={field}
          label={"Attendant " + (index + 1)}
          component={renderSelectField}></Field>
      </Grid>
    ))}
  </>
)
const BasicInformationPanel = () => {
  return (
    <FormCard title='Basic Information'>
      <Grid
        item
        container
        alignItems='flex-start'
        md={12}
        justify='center'
        spacing={3}>
        <Grid item md={6}>
          <Field
            name='shiftDate'
            label='Date'
            placeholder='Date'
            type='date'
            component={renderTextField}
          />
          <Field name='shift' label='Shift'  component={renderSelectField}>
            <MenuItem value={"AM"}>AM</MenuItem>
            <MenuItem value={"PM"}>PM</MenuItem>
          </Field>
          <Field
            name='cashier'
            label='Cashier'
            component={renderSelectField}></Field>
        </Grid>
        <Grid item md={6} style={{ marginTop: 3 }}>
          <FieldArray name='pumpAttendants' component={renderPumpAttendants} />
        </Grid>
      </Grid>
    </FormCard>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(
  null,
  null
)(
  reduxForm({
    form: "shiftForm",
    initialValues: {
      pumpAttendants: [{}, {}, {}],
    },
  })(BasicInformationPanel)
)
