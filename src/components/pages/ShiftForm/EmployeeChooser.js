import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import nextId from 'react-id-generator'

import { updatePumpAttendantOnForm } from '../../../actions/index'
import { removePumpAttendantOnForm } from '../../../actions/index'
import { addPumpAttendantOnForm } from '../../../actions/index'

const EmployeeChooser = (props) => {
  const employeesList = (employees, selected) =>
    employees.map((employee) => {
      if (!selected)
        //for Cashier only
        return (
          <option key={employee._id} value={employee._id}>
            {employee.fName + ' ' + employee.mInit + ' ' + employee.lName}
          </option>
        )
      //  For Pump attendants
      if (employee._id === selected) {
        return (
          <option key={employee._id} value={employee._id} selected>
            {employee.fName + ' ' + employee.mInit + ' ' + employee.lName}
          </option>
        )
      } else {
        return (
          <option key={employee._id} value={employee._id}>
            {employee.fName + ' ' + employee.mInit + ' ' + employee.lName}
          </option>
        )
      }
    })

  // if value is undefined

  // if value is defined (after just adding)

  const button = (addBtn) => {
    let sign = '-'
    let color = 'btn-danger'

    if (addBtn) {
      sign = '+'
      color = 'btn-success'
    }
    return (
      <button type='button' class={'btn ' + color} onClick={props.clickHandler}>
        {sign}
      </button>
    )
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    props.updatePumpAttendantOnForm(e.target.id, e.target.value)
  }

  if (props.isCashier) {
    return (
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <label className='input-group-text' htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <Field
        component='select'
          className='custom-select'
          id={props.id}
          name={props.name + '-' + props.id}
        >
          <option value='DEFAULT'>Choose...</option>
          {employeesList(props.employees)}
        </Field>
      </div>
    )
  } else
    return (
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <label className='input-group-text' htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <select
          onChange={props.updateSelected}
          className='custom-select'
          id={props.id}
          name={props.name + '-' + props.id}
        >
          <option value='DEFAULT'>Choose...</option>
          {employeesList(props.employees, props.selected)}
        </select>
        {button(props.addButton, props.handleClick)}
      </div>
    )
}
const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.addButton) {
    return {
      updateSelected: (e) =>
        dispatch(updatePumpAttendantOnForm(e.target.id, e.target.value)),
      clickHandler: () => dispatch(addPumpAttendantOnForm(nextId())),
    }
  } else {
    return {
      updateSelected: (e) =>
        dispatch(updatePumpAttendantOnForm(e.target.id, e.target.value)),
      clickHandler: () => dispatch(removePumpAttendantOnForm(ownProps.id)),
    }
  }
}
export default connect(null, mapDispatchToProps)(EmployeeChooser)
