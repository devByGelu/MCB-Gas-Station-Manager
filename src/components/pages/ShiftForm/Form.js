import React, { useEffect, useState } from "react"
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"
import Skeleton from "@material-ui/lab/Skeleton"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import {
  Field,
  reduxForm,
  FieldArray,
  hasSubmitFailed,
  getFormSyncErrors,
} from "redux-form"
import { Redirect } from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import FormHeader from "../../shared/FormHeader/FormHeader"
import validate from "../../shared/validate"
import renderSelectField from "../../shared/renderSelectField"
import SelectOptionsMapper from "../../shared/SelectOptionsMapper"
import renderFieldArray from "../../shared/renderFieldArray"

import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import PumpTab from "../../shared/PumpTab"
import FormCard from "../../shared/FormCard"
import {
  fetchMonthForms,
  fetchBasicInformation,
} from "../../../actions"
import { init } from "./formInit"

import Button from "@material-ui/core/Button"
import SubmitButton from "./SubmitButton"
const dateFormat = require("dateformat")
const useStyles = makeStyles({
  table: {
    maxWidth: 500,
  },
})
export const Form = (props) => {
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    formSyncErrors,
    submitFailed,
    submitSucceeded,
    openedForm,
    fetchMonthForms,
    formBasicInformation,
    monthForms,
    fetchBasicInformation,
    employees
  } = props
  const history = useHistory()
  const classes = useStyles()
  const pumps = [
    { label: "PUMP 1", number: "1" },
    { label: "PUMP 2", number: "2" },
    { label: "PUMP 3", number: "3" },
    { label: "PUMP 4", number: "4" },
  ]

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container direction='row' spacing={2} justify='center'>
          <Grid item md={8}>
            <FormCard title='Prices'>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'></TableCell>
                    <TableCell align='left'>Diesel(PHP)</TableCell>
                    <TableCell align='left'>Jx Premium(PHP)</TableCell>
                    <TableCell align='left'>Accelrate(PHP)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <FieldArray
                    name='pumpPrices'
                    component={renderFieldArray}
                    type='pumpPrices'
                  />
                </TableBody>
              </Table>
            </FormCard>
          </Grid>
          <Grid item md={4}>
            <Grid container item direction='row' spacing={2} justify='center'>
              <Grid container item direction='row' justify='center'>
                <FormCard title='Cashier'>
                  <Grid item md={12}>
                    <Field
                      name='Cashier'
                      // label='Cashier'
                      id='Cashier'
                      component={renderSelectField}>
                      <SelectOptionsMapper
                        items={employees.results.map(
                          (employee) => employee.eFN + " " + employee.eLN
                        )}
                        values={employees.results.map(
                          (employee) => employee.eId
                        )}
                      />
                    </Field>
                  </Grid>
                </FormCard>
              </Grid>

              <Grid item md={12}>
                <Grid item container direction='row' justify='center'>
                  <FormCard title='Pump Attendants'>
                    <FieldArray
                      name='pumpAttendants'
                      component={renderFieldArray}
                      items={employees.results.map(
                        (employee) => employee.eFN + " " + employee.eLN
                      )}
                      values={employees.results.map(
                        (employee) => employee.eId
                      )}
                      type='pumpAttendants'
                    />
                  </FormCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <FormCard title='Pump Summary'>
              <Grid item container direction='row'>
                <Grid item md={6}>
                  pump 1
                  <PumpTab
                    pumpTabLabel={pumps[0].label}
                    pumpNum={pumps[0].number}
                  />
                </Grid>
                <Grid item md={6}>
                  pump2
                  <PumpTab
                    pumpTabLabel={pumps[1].label}
                    pumpNum={pumps[1].number}
                  />
                </Grid>
                <Grid item md={6}>
                  pump 3
                  <PumpTab
                    pumpTabLabel={pumps[2].label}
                    pumpNum={pumps[2].number}
                  />
                </Grid>
                <Grid item md={6}>
                  pump 4
                  <PumpTab
                    pumpTabLabel={pumps[3].label}
                    pumpNum={pumps[3].number}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
        </Grid>
        <SubmitButton
          editMode={openedForm.attendance_form_fId !== null}
          submitting={submitting}
        />
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    openedForm: state.openedForm,
    monthForms: state.monthForms,
    initialValues: state.formInitialValues.results,
  }
}
// Returns appropriate submit handler

export default connect(mapStateToProps, {
  fetchMonthForms,
  fetchBasicInformation,
})(
  reduxForm({
    form: "shiftForm",
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    validate,
  })(Form)
)
