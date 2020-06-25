import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Step,
  StepButton,
  StepLabel,
  StepContent,
  Stepper,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"
import { connect } from "react-redux"
import {
  changeSelectedDaySelectedForm,
  deleteForm,
  toggleCreateFormDialog,
} from "../../../actions"
import CreateFormDialog from "./CreateFormDialog"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  return ["Select campaign settings", "Create an ad group", "Create an ad"]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings..."
    case 1:
      return "What is an ad group anyways?"
    case 2:
      return "This is the bit I really care about!"
    default:
      return "Unknown step"
  }
}

function HorizontalLinearStepper({
  sameDateForms,
  selectedDaySelectedForm,
  changeSelectedDaySelectedForm,
  deleteForm,
  toggleCreateFormDialog,
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Stepper orientation='vertical' activeStep={selectedDaySelectedForm}>
        {sameDateForms.map((form, index) => {
          if (form.placement)
            return (
              <Step completed={false} key={index}>
                <StepButton
                  icon={form.shift}
                  onClick={() => changeSelectedDaySelectedForm(index)}
                  disabled={false}>
                  {`Placement ${form.placement}`}
                </StepButton>
                <StepContent>
                  <Button
                    color='secondary'
                    size='small'
                    variant='outlined'
                    onClick={() => {
                      deleteForm(form.fId)
                    }}>
                    Delete
                  </Button>
                </StepContent>
              </Step>
            )
        })}
      </Stepper>
      <Button
        variant='outlined'
        size='small'
        onClick={() => toggleCreateFormDialog()}>
        Add form
      </Button>
      <CreateFormDialog sameDateForms={sameDateForms} />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeSelectedDaySelectedForm: (placement) =>
      dispatch(changeSelectedDaySelectedForm(placement)),
    deleteForm: (fId) => dispatch(deleteForm(fId)),
    toggleCreateFormDialog: () => dispatch(toggleCreateFormDialog()),
  }
}
export default connect(null, mapDispatchToProps)(HorizontalLinearStepper)
