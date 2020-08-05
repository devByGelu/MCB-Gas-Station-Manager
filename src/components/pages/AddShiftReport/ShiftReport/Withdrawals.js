import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  TextField,
  Grid,
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Typography,
  MenuItem,
} from "@material-ui/core";
import nextId from "react-id-generator";
import { FieldArray, reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";
import { createNumberMask } from "redux-form-input-masks";
import renderSelectField from "../../../shared/renderSelectField";
const currencyMask = createNumberMask({
  prefix: "PHP",
  decimalPlaces: 2,
  allowNegative: false,
});

const renderExpenses = ({
  isFieldDisabled,
  expenseCategories,
  fields,
  meta: { error, submitFailed },
}) => (
  <>
    {fields.map((field, index) => {
      const willAdd = index === 0;
      return (
        <Grid
          key={index}
          item
          container
          spacing={1}
          justify="flex-start"
          alignItems="flex-end"
          wrap="nowrap"
        >
          <Grid item style={{ paddingTop: 7 }}>
            <IconButton
              aria-label="delete"
              disabled={isFieldDisabled}
              onClick={
                willAdd ? () => fields.push({}) : () => fields.remove(index)
              }
            >
              {willAdd ? <AddIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.catName`}
              component={renderSelectField}
              label="Category"
              style={{ width: "100px" }}
            >
              {expenseCategories.map((cat, index) => (
                <MenuItem key={cat.catName} value={cat.catName}>
                  {cat.catName}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              label="Description"
              size="small"
              name={`${field}.description`}
              style={{ width: "250px" }}
              variant="outlined"
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              label="Total"
              size="small"
              type="tel"
              name={`${field}.total`}
              variant="outlined"
              style={{ width: "100px" }}
              component={renderTextField}
              {...currencyMask}
            />
          </Grid>
        </Grid>
      );
    })}
  </>
);
const Withdrawals = ({
  isFieldDisabled,
  expenseCategories,
  change,
  expenses,
}) => {
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
              checked={expenses.length ? true : false}
              onClick={() =>
                expenses.length
                  ? change("expenses", [])
                  : change("expenses", [{}])
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
      title={`Daily Withdrawals`}
    >
      <FieldArray
        isFieldDisabled={isFieldDisabled}
        name="expenses"
        expenseCategories={expenseCategories}
        component={renderExpenses}
      />
    </FormCard>
  );
};

const selector = formValueSelector("shiftForm"); // <-- same as form name
const mapStateToProps = (state) => {
  const expenses = selector(state, "expenses");
  return {
    expenses,
  };
};
export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: "shiftForm" })(Withdrawals));
