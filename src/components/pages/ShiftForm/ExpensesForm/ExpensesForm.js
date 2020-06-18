import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'

import SaveBtn from '../../../shared/SaveBtn'
import { Grid } from '@material-ui/core'
import renderFieldArray from '../../../shared/renderFieldArray'
import { connect } from 'react-redux'
import FormCard from '../../../shared/FormCard'
const ExpensesForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error, employees } = props
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
                    (employee) => employee.eFN + ' ' + employee.eLN
                  )}
                  values={employees.results.map((employee) => employee.eId)}
                  component={renderFieldArray}
                />
            </FormCard>
              </Grid>
          </Grid>
        </Grid>
      </Grid>

      <button type='submit'>submittas</button>
      {/* <SaveBtn /> */}
    </form>
  )
}
const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'shiftForm', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(ExpensesForm)
)
