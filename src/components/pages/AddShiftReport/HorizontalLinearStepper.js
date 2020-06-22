import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { changeSelectedDaySelectedForm } from '../../../actions'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...'
    case 1:
      return 'What is an ad group anyways?'
    case 2:
      return 'This is the bit I really care about!'
    default:
      return 'Unknown step'
  }
}

function HorizontalLinearStepper({
  forms,
  activeFormPlacement,
  changeSelectedDaySelectedForm,
}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Stepper orientation='vertical' activeStep={activeFormPlacement - 1}>
        {forms.map((form, index) => {
          if (form.placement)
            return (
              <Step completed={false} key={index}>
                <StepButton
                  onClick={() => changeSelectedDaySelectedForm(form.placement)}
                  disabled={false}>
                  {form.placement}
                </StepButton>
              </Step>
            )
        })}
      </Stepper>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeSelectedDaySelectedForm: (placement)=>dispatch(changeSelectedDaySelectedForm(placement)) 
  }
}
export default connect(null, mapDispatchToProps)(HorizontalLinearStepper)
