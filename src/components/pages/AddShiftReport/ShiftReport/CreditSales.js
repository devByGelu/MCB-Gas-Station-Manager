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

const renderCreditSales = ({customers,products, fields, meta: { error, submitFailed } }) => (
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
          <Grid item style={{ paddingTop: 7 }}>
            <IconButton
              aria-label="delete"
              onClick={
                willAdd ? () => fields.push({}) : () => fields.remove(index)
              }
            >
              {willAdd ? <AddIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <Autocomplete
              size="small"
              options={customers}
              getOptionLabel={(option) => option.companyName}
              renderInput={(params) => (
                <Field
                  {...params}
                  label="Customer"
                  variant="outlined"
                  name={`${field}.companyName`}
                  component={renderTextField}
                />
              )}
            />
          </Grid>
          <Grid item>
            {/* <Autocomplete
              size="small"
              key={index}
              options={categories}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => ( */}
                <Field
                  // {...params}
                  label="Driver"
                  variant="outlined"
                  name={`${field}.driver`}
                  component={renderTextField}
                />
              {/* )}
            /> */}
          </Grid>
          <Grid item>
            <Field
              name={`${field}.plateNum`}
              style={{ width: "70px" }}
              variant="outlined"
              size="small"
              label="Plate#"
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <Field
              name={`${field}.invoiceNum`}
              style={{ width: "70px" }}
              variant="outlined"
              size="small"
              label="Invoice#"
              component={renderTextField}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              size="small"
              key={index}
              options={products}
              getOptionLabel={(option) => option.pName}
              renderInput={(params) => (
                <Field
                  {...params}
                  label="Fuel type"
                  variant="outlined"
                  name={`${field}.pName`}
                  component={renderTextField}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Field
              name={`${field}.volume`}
              variant="outlined"
              size="small"
              label="Volume"
              style={{ width: "90px" }}
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <Field
              name={`${field}.discountedPrice`}
              style={{ width: "90px" }}
              variant="outlined"
              size="small"
              label="Disc. Price"
              component={renderTextField}
            />
          </Grid>
        </Grid>
      );
    })}
  </>
);
function CreditSales({customers,products}) {
  return (
    <FormCard width={900} title={`Credit Sales`} >
      <FieldArray name="creditsales" customers={customers} products={products} component={renderCreditSales} />
    </FormCard>
  );
}

export default connect(
  null,
  null
)(reduxForm({ form: "shiftForm" })(CreditSales));
