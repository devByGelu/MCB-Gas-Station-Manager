import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import nextId from 'react-id-generator'
import { Redirect } from 'react-router-dom'

import ReportsAPI from '../../../apis/ReportsAPI'
import PriceTable from './PriceTable'
import EmployeeChooser from './EmployeeChooser'
import PumpSubform from './PumpSubform'
import { fetchEmployees } from '../../../actions/index'
import PumpAttendants from './PumpAttendants'
import FormHeader from '../../shared/FormHeader/FormHeader'

const onSubmit = async (values) => {
  try {
    console.log(values)
    alert(JSON.stringify(values))
  } catch (error) {
    console.log(error.response)
  }
  // setLoading()
}
export const Form = (props) => {
  useEffect(() => {
    if (props.employees.results === null) props.fetchEmployees()
  }, [])

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

  if (props.employees.error) {
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
  } else if (props.employees.results === null || props.employees.loading) {
    return (
      <div class='spinner-border text-primary' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
    )
  } else
    return (
      <React.Fragment>
        <div className='container'>
          <form onSubmit={props.handleSubmit}>
            <div className='form-row'>
              <div className='col-md'>
                <FormHeader text = {'Attendance'}/>
              </div>
            </div>

            <div className='form-row'>
              <div className='col-md'>
                <EmployeeChooser
                  employees={props.employees.results}
                  key={69}
                  isCashier={true}
                  name='Cashier'
                  id={69}
                />
              </div>
              <div className='col-md'>
                <PumpAttendants
                  employees={props.employees.results}
                  activePumpAttendants={props.shiftFormPumpAttendants}
                />
              </div>
            </div>
<FormHeader text='Price'/>
            <div className='form-row'>
              <PriceTable />
            </div>
            <FormHeader text='Liters'/>

            <div className='form-row'>
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
            <button type='submit' name='asd'>
              Try me
            </button>
          </form>
        </div>
      </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
    pump1ActiveNavLink: state.pump1ActiveNavLink.product,
    pump2ActiveNavLink: state.pump2ActiveNavLink.product,
    pump3ActiveNavLink: state.pump3ActiveNavLink.product,
    pump4ActiveNavLink: state.pump4ActiveNavLink.product,
    shiftFormPumpAttendants: state.shiftFormPumpAttendants,
    employees: state.employees,
  }
}

export default connect(mapStateToProps, { fetchEmployees })(
  reduxForm({
    form: 'shiftForm',
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    onSubmit: onSubmit,
  })(Form)
)
