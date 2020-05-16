import React, { useEffect } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchEmployees } from '../../../actions/index'
const EmployeeChooser = (props) => {
  useEffect(() => {
    props.fetchEmployees()
  }, [props.fetchEmployees])

  if (props.employees.error)
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
  else if (props.employees.loading || !props.employees.results)
    return (
      <div class='spinner-border text-primary' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
    )
  else {
    const employeesList = props.employees.results.map((employee) => (
      <option key={employee._id} value={employee._id}>
        {employee.fName+' '+employee.mInit+' '+employee.lName}
      </option>
    ))
    return (
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <label className='input-group-text' htmlFor={props.name}>
            {props.name}
          </label>
        </div>
        <Field
          component='select'
          className='custom-select'
          id={props.name}
          name={props.name}
        >
          <option value='DEFAULT'>Choose...</option>
          {employeesList}
        </Field>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  }
}

export default connect(mapStateToProps, { fetchEmployees })(EmployeeChooser)
