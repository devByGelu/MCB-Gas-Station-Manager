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
import CurrencyInput from "./CurrencyInput";

const currencyMask = createNumberMask({
  prefix: "PHP",
  decimalPlaces: 2,
  allowNegative: false,
});
const renderCreditSales = ({
  isFieldDisabled,
  customers,
  products,
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
          md={12}
          spacing={1}
          justify="flex-end"
          alignItems="flex-end"
          wrap="nowrap"
        >
          <Grid item style={{ paddingTop: 7 }}>
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
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.companyName`}
              component={renderSelectField}
              style={{ width: "100px" }}
              label="Customer"
            >
              {customers.map((cust, index) => (
                <MenuItem key={cust.companyName} value={cust.companyName}>
                  {cust.companyName}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              label="Driver"
              size="small"
              name={`${field}.driver`}
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.plateNum`}
              style={{ width: "100px" }}
              type="text"
              size="small"
              label="Plate#"
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.invoiceNum`}
              style={{ width: "70px" }}
              type="tel"
              size="small"
              label="Invoice#"
              {...createNumberMask({
                allowNegative: false,
              })}
              component={renderTextField}
            />
          </Grid>

          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.pName`}
              style={{ width: "100px" }}
              component={renderSelectField}
              label="Fuel Type"
            >
              {products.map((prod, index) => (
                <MenuItem key={prod.pName} value={prod.pName}>
                  {prod.pName}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item>
            <Field
              disabled={isFieldDisabled}
              name={`${field}.volume`}
              size="small"
              label="Volume"
              style={{ width: "90px" }}
              {...createNumberMask({
                decimalPlaces: 3,
                allowNegative: false,
              })}
              component={renderTextField}
            />
          </Grid>
          <Grid item>
            <CurrencyInput
              disabled={isFieldDisabled}
              label="Disc. Price"
              name={`${field}.discountedPrice`}
            />
          </Grid>
        </Grid>
      );
    })}
  </>
);
function CreditSales({
  isFieldDisabled,
  creditsales,
  change,
  customers,
  products,
}) {
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
              checked={creditsales.length ? true : false}
              onClick={() =>
                creditsales.length
                  ? change("creditsales", [])
                  : change("creditsales", [{}])
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
      title={`Credit Sales`}
    >
      <FieldArray
        isFieldDisabled={isFieldDisabled}
        name="creditsales"
        customers={customers}
        products={products}
        component={renderCreditSales}
      />
    </FormCard>
  );
}

const selector = formValueSelector("shiftForm"); // <-- same as form name
const mapStateToProps = (state) => {
  const creditsales = selector(state, "creditsales");
  return {
    creditsales,
  };
};
export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: "shiftForm" })(CreditSales));
