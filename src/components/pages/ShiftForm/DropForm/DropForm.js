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
import SubmitButton from '../SubmitButton'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { fetchEmployees } from '../../../../actions'
const DropForm = ({submitting,openedForm,monthForms,handleSubmit})  => {
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        </Grid>
      <SubmitButton
        editMode={openedForm.drop_form_fId !== null}
        submitting={submitting}
      />
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    openedForm: state.openedForm,
    monthForms: state.monthForms,
    initialValues: state.formInitialValues.results,
  }
}

export default connect(mapStateToProps,)(reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(DropForm)
)