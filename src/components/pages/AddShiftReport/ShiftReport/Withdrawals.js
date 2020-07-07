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
} from "@material-ui/core";
import nextId from "react-id-generator";
import { FieldArray, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";

const renderExpenses = ({expenseCategories, fields, meta: { error, submitFailed } }) => (
  <>
    {fields.map((field, index) => {
      const willAdd = index === 0;
      return (
        <Grid
          key={index}
          item
          container
          md={12}
          spacing={1}
          justify="center"
          alignItems="flex-start"
        >
          <Grid item md={1} style={{ paddingTop: 7 }}>
            <IconButton
              aria-label="delete"
              onClick={
                willAdd ? () => fields.push({}) : () => fields.remove(index)
              }
            >
              {willAdd ? <AddIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              size="small"
              options={expenseCategories}
              getOptionLabel={(option) => option.catName}
              renderInput={(params) => (
                <Field
                  {...params}
                  label="Category"
                  variant="outlined"
                  name={`${field}.catName`}
                  component={renderTextField}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Field
              label="Description"
              size="small"
              name={`${field}.description`}
              variant="outlined"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={2}>
            <Field
              label="Total"
              size="small"
              name={`${field}.total`}
              variant="outlined"
              component={renderTextField}
            />
          </Grid>
        </Grid>
      );
    })}
  </>
);
const Withdrawals = ({expenseCategories}) => {
  return (
    <FormCard width={900} title={`Utilities & Daily Expenses`}>
      <FieldArray name="expenses" expenseCategories={expenseCategories} component={renderExpenses} />
    </FormCard>
  );
};

export default connect(
  null,
  null
)(reduxForm({ form: "shiftForm" })(Withdrawals));
