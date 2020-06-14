import React, { useEffect, useState } from 'react'
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
import PumpSubform from './PumpSubform'
import { fetchEmployees } from '../../../actions/index'
import FormHeader from '../../shared/FormHeader/FormHeader'
import validate from '../../shared/validate'
import RenderErrors from '../../shared/RenderErrors'
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
export const Form = (props) => {
  const pumps = [{label:'PUMP 1',number:'1'}, {label:'PUMP 2',number:'2'}, {label:'PUMP 3',number:'3'}, {label:'PUMP 4',number:'4'}]
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    formSyncErrors,
    submitFailed,
  } = props
  useEffect(() => {
    if (props.employees === undefined || props.employees.results === null)
      props.fetchEmployees()
  }, [])

  const renderEmployeesErrors = () => {
    if (submitFailed && formSyncErrors.Cashier)
      return (
        <RenderErrors
          errors={[submitFailed && formSyncErrors.Cashier]}
          errorMessages={[JSON.stringify(formSyncErrors.Cashier._error)]}
        />
      )
    else if (submitFailed && formSyncErrors.pumpAttendants)
      return (
        <RenderErrors
          errors={[submitFailed && formSyncErrors.pumpAttendants]}
          errorMessages={[JSON.stringify(formSyncErrors.pumpAttendants._error)]}
        />
      )
    else return <></>
  }
  const isActiveInPump1 = (productName) => {
    return productName === props.pump1ActiveNavLink ? '' : 'd-none'
  }
  const isActiveInPump2 = (productName) => {
    return productName === props.pump2ActiveNavLink ? '' : 'd-none'
  }
  const isActiveInPump3 = (productName) => {
    return productName === props.pump3ActiveNavLink ? '' : 'd-none'
  }
  const isActiveInPump4 = (productName) => {
    return productName === props.pump4ActiveNavLink ? '' : 'd-none'
  }

  if (
    props.employees === undefined ||
    props.employees.results === null ||
    props.employees.loading
  ) {
    return (
      <div class='spinner-border text-primary' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
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
  } else
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <div className='form-row'>
              <div className='col-md'>
                <FormHeader text={'Attendance'} />
              </div>
            </div>
            <div className='form-row'>
              <div className='col-md'>
                <Field
                  name='Cashier'
                  label='Cashier'
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
              </div>
              <div className='col-md'>
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
              </div>
            </div>
            {renderEmployeesErrors()}
            <FormHeader text='Price' />
            <div className='form-row'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'></TableCell>
                    <TableCell align='right'>Diesel</TableCell>
                    <TableCell align='right'>Accelrate</TableCell>
                    <TableCell align='right'>Jx Premium</TableCell>
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
            </div>
          </div>
          <FormHeader text='Liters' />
          <div className='form-row'>
            <Grid container spacing={3} alignItems='center' justify='center'>
              {pumps.map((pump) => (
                <Grid item md={6}>
                  <Paper>
                    <PumpTab pumpTabLabel={pump.label} pumpNum={pump.number}/>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div className='d-none'>
              <div className='col-md'>
                <PumpSubform pumpNumber='1' isActive={isActiveInPump1} />
              </div>
              <div className='col-md'>
                <PumpSubform pumpNumber='2' isActive={isActiveInPump2} />
              </div>
            </div>
            <div className='form-row'>
              <div className='col-md'>
                <PumpSubform pumpNumber='3' isActive={isActiveInPump3} />
              </div>
              <div className='col-md'>
                <PumpSubform pumpNumber='4' isActive={isActiveInPump4} />
              </div>
            </div>
          </div>
          <button type='submit'>submit!!!</button>
        </form>
      </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
    pump1ActiveNavLink: state.pump1ActiveNavLink.product,
    pump2ActiveNavLink: state.pump2ActiveNavLink.product,
    pump3ActiveNavLink: state.pump3ActiveNavLink.product,
    pump4ActiveNavLink: state.pump4ActiveNavLink.product,
    submitFailed: hasSubmitFailed('shiftForm')(state),
    formSyncErrors: getFormSyncErrors('shiftForm')(state),
    employees: state.employees,
  }
}
// Returns appropriate submit handler

export default connect(mapStateToProps, { fetchEmployees })(
  reduxForm({
    form: 'shiftForm',
    initialValues: {
      Cashier: 2,
      pumpAttendants: [{ PA: 1 }],
      pumpPrices: [
        { diesel: '', accelrate: '', jxpremium: '' },
        { diesel: '', accelrate: '', jxpremium: '' },
      ],
    },
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    validate,
  })(Form)
)
