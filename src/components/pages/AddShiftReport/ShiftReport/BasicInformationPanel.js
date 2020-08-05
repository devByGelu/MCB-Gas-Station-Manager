import React, { Component } from "react";
import { connect } from "react-redux";
import FormCard from "./FormCard";
import { Field, FieldArray, reduxForm } from "redux-form";
import { MenuItem, Grid, List, ListItem, Paper } from "@material-ui/core";
import renderSelectField from "../../../shared/renderSelectField";
import renderTextField from "../../../shared/renderTextField";
import nextId from "react-id-generator";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
const renderPumpAttendants = ({
  employees,
  isFieldDisabled,
  fields,
  meta: { error, submitFailed },
}) => (
  <>
    {fields.map((field, index) => (
      <Grid item xs={12} key={index}>
        <Field
          disabled={isFieldDisabled}
          name={field}
          label={"Attendant " + (index + 1)}
          component={renderSelectField}
        >
          <MenuItem value={null}>None</MenuItem>
          {employees.map((emp, index) => (
            <MenuItem key={emp.eId} value={emp.eId}>
              {emp.nickName}
            </MenuItem>
          ))}
        </Field>
      </Grid>
    ))}
  </>
);
const BasicInformationPanel = ({ employees, isFieldDisabled }) => {
  return (
    <FormCard title="Basic Information">
      <Grid
        item
        container
        alignItems="flex-start"
        xs={12}
        justify="center"
        spacing={3}
      >
        <Grid item container alignItems="flex-end" spacing={1} xs={6}>
          <Grid item xs={12}>
            <Field
              name="shiftDate"
              label="Date"
              placeholder="Date"
              type="date"
              component={renderTextField}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="placement"
              label="Placement"
              placeholder="Placement"
              type="tel"
              component={renderTextField}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="shift"
              label="Shift"
              component={renderSelectField}
              disabled
            >
              <MenuItem value={"AM"}>AM</MenuItem>
              <MenuItem value={"PM"}>PM</MenuItem>
            </Field>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Field
              disabled={isFieldDisabled}
              name="cashier"
              label="Cashier"
              component={renderSelectField}
            >
              {employees.map((emp, index) => (
                <MenuItem key={emp.eId} value={emp.eId}>
                  {emp.nickName}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <FieldArray
            name="pumpAttendants"
            isFieldDisabled={isFieldDisabled}
            employees={employees}
            component={renderPumpAttendants}
          />
        </Grid>
      </Grid>
    </FormCard>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  null,
  null
)(
  reduxForm({
    form: "shiftForm",
    initialValues: {
      pumpAttendants: [{}, {}, {}],
      expenses: [{}],
      cashadvance: [{}],
      creditsales: [{}],
    },
  })(BasicInformationPanel)
);
