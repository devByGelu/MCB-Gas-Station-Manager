import React from "react"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"
import renderField from "../../../shared/renderField"
import validate from "../../../shared/validate"
import Skeleton from "@material-ui/lab/Skeleton"
import SaveBtn from "../../../shared/SaveBtn"
import { Grid } from "@material-ui/core"
import renderFieldArray from "../../../shared/renderFieldArray"
import { connect } from "react-redux"
import FormCard from "../../../shared/FormCard"
import { useHistory } from "react-router-dom"
import SubmitButton from "../SubmitButton"
import { init } from "../initGrp1"
import { fetchEmployees } from "../../../../actions"
const ExpensesForm = (props) => {
  const {
    openedForm,
    monthForms,
    handleSubmit,
    pristine,
    reset,
    submitting,
    error,
    employees,
    fetchEmployees,
  } = props
  const history = useHistory()
  useEffect(() => {
    if (employees === undefined || employees.results === null) fetchEmployees()
  }, [])
  if (!openedForm.date) history.push("/addreport")
  if (
    employees === undefined ||
    employees.results === null ||
    employees.loading
  ) {
    return (
      <Skeleton animation='wave' style={{ width: "100%", height: "100%" }} />
    )
  } else if (employees.error) {
    return (
      <Redirect
        to={{
          pathname: "/error-page",
          state: {
            status: employees.error.status,
            data: employees.error.data,
          },
        }}
      />
    )
  } else
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='center'
          alignItems='flex-start'>
          <Grid item md={6}>
            <Grid
              item
              container
              direction='row'
              alignItems='flex-end'
              spacing={1}
              justify='center'>
              <FormCard title='Utilities & Daily Expenses'>
                <FieldArray
                  name='expenses'
                  type='expenses'
                  component={renderFieldArray}
                />
              </FormCard>
            </Grid>
          </Grid>
          <Grid item container spacing={2} md={6}>
            <Grid item md={12}>
              <Grid
                item
                container
                direction='row'
                alignItems='flex-end'
                spacing={1}
                justify='center'>
                <FormCard title='Credit Sales'>
                  <FieldArray
                    name='creditsales'
                    type='creditsales'
                    component={renderFieldArray}
                  />
                </FormCard>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid
                item
                container
                direction='row'
                alignItems='flex-end'
                spacing={1}
                justify='center'>
                <FormCard title='Cash Advance'>
                  <FieldArray
                    name='cashadvance'
                    type='cashadvance'
                    items={employees.results.map(
                      (employee) => employee.eFN + " " + employee.eLN
                    )}
                    values={employees.results.map((employee) => employee.eId)}
                    component={renderFieldArray}
                  />
                </FormCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SubmitButton
          editMode={openedForm.expenses_form_fId !== null}
          submitting={submitting}
        />
      </form>
    )
}
const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    openedForm: state.openedForm,
    monthForms: state.monthForms,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch(fetchEmployees()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "shiftForm", // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
    initialValues: init(),
  })(ExpensesForm)
)
