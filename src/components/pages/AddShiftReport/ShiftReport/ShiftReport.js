import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, MenuItem, CircularProgress } from '@material-ui/core'
import nextId from 'react-id-generator'
import FormCard from './FormCard'
import { Fields, Field, reduxForm } from 'redux-form'
import renderTextField from '../../../shared/renderTextField'
import renderSelectField from '../../../shared/renderSelectField'
import BasicInformationPanel from './BasicInformationPanel'
import { fetchEmployees } from '../../../../actions'
import DenseTable from './DenseTable'
import PumpInfo from './PumpInfo'
const Report = (props) => {
  useEffect(() => {
    fetchEmployees()
  }, [])
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    fetchEmployees,
    employees,
  } = props
  const pumps = ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4']
  // if (employees.error) return <>An error occured</>
  // if (employees.loading || !employees.results)
  //   return (
  //     <Grid container alignItems='center' justify='center'>
  //         <CircularProgress style={{marginTop: 400}}/>
  //     </Grid>
  //   )
  return (
    <Grid container spacing={3} justify='center' alignItems='flex-start'>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <Grid container item md={12} direction='row' style={{marginBottom: 6}}>
          <BasicInformationPanel />
        </Grid>
        {/* Pump Summaries */}
        <Grid item md={12}  style={{marginBottom: 6}}>
          <PumpInfo number={1} />
        </Grid>
        <Grid item md={12} style={{marginBottom: 6}}>
          <PumpInfo number={2} />
        </Grid>
        <Grid item md={12} style={{marginBottom: 6}}>
          <PumpInfo number={3} />
        </Grid>
        <Grid item md={12} style={{marginBottom: 6}}>
          <PumpInfo number={4} />
        </Grid>
        {/* <DenseTable/> */}
        {/* Advance Reading */}
      </form>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  employees: state.employees,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { fetchEmployees })(
  reduxForm({
    form: 'shiftForm',
  })(Report)
)
