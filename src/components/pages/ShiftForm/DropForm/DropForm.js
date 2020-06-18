import React from 'react'
import FormCard from '../../../shared/FormCard'
import Grid from '@material-ui/core/Grid'
import { Field, Fields, FieldArray, reduxForm } from 'redux-form'
import Table from '../../../shared/Table/Table'
import RenderField from '../AdvanceReadingForm/RenderField'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import renderField from '../../../shared/renderField'
// import RemoteSubmitButton from '../../../shared/RemoteSubmitButton'
// import submit from '../../../shared/submit'
import validate from '../../../shared/validate'
import renderSelectField from '../../../shared/renderSelectField'
import renderTextField from '../../../shared/renderTextField'
import renderFieldArray from '../../../shared/renderFieldArray'
const DropForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <Grid
          container
          spacing={3}
          alignItems='flex-start'
          justify='center'
          direction='row'>
          <Grid item md={6}>
            <Grid item container justify='center' spacing={2} >
              <FormCard title='Drop Summary'>
                <Grid item md={12}>
                  <Field
                    name='drops'
                    component={renderTextField}
                    label='# of drops'
                    // label={`${cellName} L`}
                  />
                </Grid>
                <Grid item md={12}>
                  <Field
                    name='amountPerDrop'
                    component={renderTextField}
                    label='amount/drop'
                    // label={`${cellName} L`}
                  />
                </Grid>

                <Grid item md={12}>
                  <Field
                    name='lastDrop'
                    component={renderTextField}
                    label='last drop'
                    // label={`${cellName} L`}
                  />
                </Grid>
              </FormCard>
            </Grid>
          </Grid>

          <Grid item md={6}>
            <Grid item container justify='center' spacing={2}>
              <FormCard title='Last drop Breakdown'>
                <Grid item md={12}>
                  <FieldArray
                    name='lastDropBreakdown'
                    component={renderFieldArray}
                    type='lastDropBreakdown'
                  />
                </Grid>
              </FormCard>
            </Grid>
          </Grid>
          {/* 
          <FormCard title='Drop Summary'>
            <Grid item md={6}>
              <Grid item container justify='center' spacing={2}>
                <Grid item md={12}>
                 
                </Grid>

                <Grid item md={12}>
               
                </Grid>

                <Grid item md={12}>
               
                </Grid>

              </Grid>
            </Grid>
          </FormCard>
          <Grid item md={6}>
            <Grid item container direction='row'>
                
              </FormCard>
            </Grid>
          </Grid> */}
        </Grid>

        <button type='submit'>submitttt</button>
      </form>
    </>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  // onSubmit: submit,
})(DropForm)
