import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  IconButton,
  Checkbox,
  Typography,
  FormControlLabel,
  MenuItem,
} from "@material-ui/core";
import { FieldArray, reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";
import { createNumberMask } from "redux-form-input-masks";
import renderSelectField from "../../../shared/renderSelectField";

const renderCashAdvance = ({
  employees,
  isFieldDisabled,
  fields,
  meta: { error, submitFailed },
}) => {
  {
    console.log("rerenderr cashadvance");
  }
  return (
    <>
      {fields.map((field, index) => {
        const willAdd = index === 0;

        return (
          <Grid
            key={index}
            item
            container
            xs={12}
            spacing={1}
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item xs={2} style={{ paddingTop: 7 }}>
              <IconButton
                disabled={isFieldDisabled}
                aria-label="delete"
                onClick={
                  willAdd ? () => fields.push({}) : () => fields.remove(index)
                }
              >
                {willAdd ? <AddIcon /> : <DeleteIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <Field
                name={`${field}.employee`}
                component={renderSelectField}
                label="Employee"
                disabled={isFieldDisabled}
              >
                {employees.map((emp, index) => (
                  <MenuItem key={index} value={emp.eId}>
                    {emp.nickName}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={5}>
              <Field
                disabled={isFieldDisabled}
                label="Amount"
                type="tel"
                size="small"
                name={`${field}.amt`}
                variant="outlined"
                component={renderTextField}
                {...createNumberMask({
                  prefix: "PHP",
                  decimalPlaces: 2,
                  allowNegative: false,
                })}
              />
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
const CashAdvance = ({ employees, change, cashadvance, isFieldDisabled }) => {
  return (
    <FormCard
      action={
        <FormControlLabel
          control={
            <Checkbox
              disabled={isFieldDisabled}
              style={{
                color: "white",
              }}
              checked={cashadvance.length ? true : false}
              onClick={() =>
                cashadvance.length
                  ? change("cashadvance", [])
                  : change("cashadvance", [{}])
              }
            />
          }
          label={
            <Typography variant="overline" style={{ color: "white" }}>
              Include
            </Typography>
          }
        />
      }
      width={900}
      title={`Cash Advance`}
    >
      {cashadvance.length ? (
        <FieldArray
          isFieldDisabled={isFieldDisabled}
          employees={employees}
          name="cashadvance"
          component={renderCashAdvance}
        />
      ) : (
        <></>
      )}
    </FormCard>
  );
};
const selector = formValueSelector("shiftForm"); // <-- same as form name
const mapStateToProps = (state) => {
  const cashadvance = selector(state, "cashadvance");
  return {
    cashadvance,
  };
};
export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: "shiftForm" })(CashAdvance));
