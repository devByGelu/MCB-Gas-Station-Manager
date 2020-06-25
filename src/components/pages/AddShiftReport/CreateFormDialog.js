import React from "react"
import nextId from "react-id-generator"
import { Field, reduxForm, submit } from "redux-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { connect } from "react-redux"
import renderTextField from "../../shared/renderTextField"
import { toggleCreateFormDialog } from "../../../actions"
import renderSelectField from "../../shared/renderSelectField"
import SelectOptionsMapper from "../../shared/SelectOptionsMapper"
import submitForm from "../../shared/submitForm"
import validate from "../../shared/validate"
var initPlacement = 3
function CreateFormDialog({
  handleSubmit,
  forms,
  open,
  toggleCreateFormDialog,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => toggleCreateFormDialog()}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Field
            name='placement'
            component={renderTextField}
            label='Placement'
            type='number'
          />
          <br />
          <Field
            name='shift'
            // label='Cashier'
            id='shift'
            component={renderSelectField}>
            <SelectOptionsMapper items={["AM", "PM"]} />
          </Field>
        </DialogContent>
        <DialogActions>
          <Button type='submit'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
const mapStateToProps = (state) => {
  return {
    open: state.createFormDialog.open,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleCreateFormDialog: () => dispatch(toggleCreateFormDialog()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "form1",
    initialValues: {
      shift: "AM",
      placement: initPlacement,
    },
  })(CreateFormDialog)
)
