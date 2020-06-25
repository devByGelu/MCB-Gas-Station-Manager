import React from "react";
import { useHistory } from "react-router-dom";
import { FieldArray, reduxForm } from "redux-form";
import validate from "../../../shared/validate";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import renderFieldArray from "../../../shared/renderFieldArray";
import FormCard from "../../../shared/FormCard";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";

const AdvanceReadingForm = ({ handleSubmit, openedForm, submitting }) => {
  const history = useHistory();
  if (!openedForm.date) history.push("/addreport");
  return (
    <form onSubmit={handleSubmit}>
      <FormCard title='Advance Reading'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Pump</TableCell>
              <TableCell align='left'>Diesel(L)</TableCell>
              <TableCell align='left'>Accelrate(L)</TableCell>
              <TableCell align='left'>Jx Premium(L)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <FieldArray
              name='advanceReading'
              component={renderFieldArray}
              type='advanceReading'
            />
          </TableBody>
        </Table>
      </FormCard>
      <SubmitButton
        editMode={openedForm.advance_reading_form_fId !== null}
        submitting={submitting || openedForm.attendance_form_fId === null}
      />
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    openedForm: state.openedForm,
    initialValues: state.formBasicInformation.results
  };
};
export default connect(mapStateToProps)(
  reduxForm({
    form: "shiftForm", // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(AdvanceReadingForm)
);
