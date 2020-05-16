import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import ReportsAPI from '../../../apis/ReportsAPI'
import PriceTable from './PriceTable'
import EmployeeChooser from './EmployeeChooser'
import PumpSubform from './PumpSubform'

const onSubmit = async (values) => {
  try {
    // setLoading(true)
    // let res = await ReportsAPI.post('/', { title: 'HELLO WORLD' })
  } catch (error) {
    console.log(error.response)
  }
  // setLoading(false)
}

export const Form = (props) => {
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
  return (
    <React.Fragment>
      <div className='container'>
        <form onSubmit={props.handleSubmit}>
          <div className='form-row'>
            <EmployeeChooser name='Cashier' />
            <EmployeeChooser name='Pump-Attendant' onChangeEmployeehandler='' />
          </div>

          <div className='form-row'>
            <PriceTable />
          </div>

          <div className='form-row'>
            <PumpSubform pumpNumber='1' isActive={isActiveInPump1} />
          </div>
          <div className='form-row'>
            <PumpSubform pumpNumber='2' isActive={isActiveInPump2} />
          </div>
          <div className='form-row'>
            <PumpSubform pumpNumber='3' isActive={isActiveInPump3} />
          </div>
          <div className='form-row'>
            <PumpSubform pumpNumber='4' isActive={isActiveInPump4} />
          </div>

          <button type='submit'>Try me</button>
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
  }
}

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'shiftForm', onSubmit: onSubmit })(Form))
