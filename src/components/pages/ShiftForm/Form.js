import React, { useEffect, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from "@material-ui/lab/Skeleton"
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  Field,
  reduxForm,
  FieldArray,
  hasSubmitFailed,
  getFormSyncErrors,
} from 'redux-form'
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import renderField from '../../shared/renderField'
// import { fetchEmployees } from '../../../actions/index'

import FormHeader from '../../shared/FormHeader/FormHeader'
import validate from '../../shared/validate'
import renderSelectField from '../../shared/renderSelectField'
import SelectOptionsMapper from '../../shared/SelectOptionsMapper'
import renderFieldArray from '../../shared/renderFieldArray'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PumpTab from '../../shared/PumpTab'
import FormCard from '../../shared/FormCard'
import { fetchEmployees, fetchMonthForms } from '../../../actions'
import { init } from './initGrp1'

import Button from '@material-ui/core/Button'
import SubmitButton from './SubmitButton'
const dateFormat = require('dateformat')
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
    monthForms
    
  } = props
  const history = useHistory()
  const classes = useStyles()
  const pumps = [
    { label: 'PUMP 1', number: '1' },
    { label: 'PUMP 2', number: '2' },
    { label: 'PUMP 3', number: '3' },
    { label: 'PUMP 4', number: '4' },
  ]
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }
  
  useEffect(() => {
    if (props.employees === undefined || props.employees.results === null)
      props.fetchEmployees()
  },[])

  if(!openedForm.date)
  history.push('/addreport')
  if (
    props.employees === undefined ||
    props.employees.results === null ||
    props.employees.loading
  ) {
    return (

      <Skeleton animation='wave' style={{ width: "100%", height: "100%" }} />
    )
  } else if (props.employees.error) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: {
            status: props.employees.error.status,
            data: props.employees.error.data,
          },
        }}
      />
    )
  } else{

  const isSettled = openedForm.attendance_form_fId !== null
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
                      <TableCell align='left'>Accelrate(PHP)</TableCell>
                      <TableCell align='left'>Jx Premium(PHP)</TableCell>
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
                          items={props.employees.results.map(
                            (employee) => employee.eFN + ' ' + employee.eLN
                          )}
                          values={props.employees.results.map(
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
                        items={props.employees.results.map(
                          (employee) => employee.eFN + ' ' + employee.eLN
                        )}
                        values={props.employees.results.map(
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
                    <PumpTab
                      pumpTabLabel={pumps[0].label}
                      pumpNum={pumps[0].number}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <PumpTab
                      pumpTabLabel={pumps[1].label}
                      pumpNum={pumps[1].number}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <PumpTab
                      pumpTabLabel={pumps[2].label}
                      pumpNum={pumps[2].number}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <PumpTab
                      pumpTabLabel={pumps[3].label}
                      pumpNum={pumps[3].number}
                    />
                  </Grid>
                </Grid>
              </FormCard>
            </Grid>
          </Grid>
          <SubmitButton editMode = {openedForm.attendance_form_fId !== null } submitting = {submitting}/> 
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    submitFailed: hasSubmitFailed('shiftForm')(state),
    formSyncErrors: getFormSyncErrors('shiftForm')(state),
    employees: state.employees,
    openedForm: state.openedForm,
    monthForms: state.monthForms
  }
}
// Returns appropriate submit handler

export default connect(mapStateToProps, { fetchEmployees,fetchMonthForms })(
  reduxForm({
    form: 'shiftForm',
    initialValues: init(),
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    validate,
  })(Form)
)
