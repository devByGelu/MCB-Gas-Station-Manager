import React, { Component, useEffect } from "react"
import { useHistory } from "react-router-dom"
import SubmitButton from "../SubmitButton"
import RenderField from "../AdvanceReadingForm/RenderField"

import { Field, FieldArray, reduxForm } from "redux-form"
import renderField from "../../../shared/renderField"
import validate from "../../../shared/validate"
import {
  TableBody,
  TableHead,
  Table,
  TableRow,
  TableCell,
} from "@material-ui/core"
import renderFieldArray from "../../../shared/renderFieldArray"
import FormCard from "../../../shared/FormCard"
import { connect } from "react-redux"

// import submit from '../../../shared/submit'

export const DipstickReadingForm = ({
  handleSubmit,
  openedForm,
  monthForms,
  submitting,
}) => {
  const history = useHistory()
  if (!openedForm.date) history.push("/addreport")
  return (
    <form onSubmit={handleSubmit}>
      <FormCard title='Dipstick Reading'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='left'>Opening</TableCell>
              <TableCell align='left'>Closing</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <FieldArray
              name='dipstick'
              component={renderFieldArray}
              type='dipstick'
            />
          </TableBody>
        </Table>
      </FormCard>
      <SubmitButton
        editMode={openedForm.dipstick_reading_form_fId !== null}
        submitting={submitting}
      />
    </form>
  )
}
const mapStateToProps = (state) => {
  return {
    openedForm: state.openedForm,
    monthForms: state.monthForms,
    initialValues: state.formBasicInformation.results
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: "shiftForm", // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(DipstickReadingForm)
)
