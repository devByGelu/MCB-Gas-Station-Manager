import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, Grid } from "@material-ui/core";
import nextId from "react-id-generator";
import { FieldArray, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";
import { createNumberMask } from "redux-form-input-masks";

const currencyMask = createNumberMask({
  prefix: "PHP",
  decimalPlaces: 2,
  allowNegative: false,
});
const useStyles = makeStyles({
  table: { fontSize: 3 },
  tableText: {
    fontSize: 12,
  },
  resize: {
    fontSize: 10,
  },
});
function Drop({ isFieldDisabled, number }) {
  const classes = useStyles();
  function createData(label, field) {
    return { label, field };
  }
  let rows = [
    createData(
      "Drops",

      <Field
        name={`dropForm.drops`}
        variant="outlined"
        type="tel"
        disabled={isFieldDisabled}
        component={renderTextField}
        {...createNumberMask({
          allowNegative: false,
        })}
      />
    ),
    createData(
      "Amt/Drop",

      <Field
        name={`dropForm.amtPerDrop`}
        disabled={isFieldDisabled}
        variant="outlined"
        component={renderTextField}
        {...currencyMask}
      />
    ),
    createData(
      "Last Drop",

      <Field
        name={`dropForm.lastDrop`}
        disabled={isFieldDisabled}
        variant="outlined"
        component={renderTextField}
        {...currencyMask}
      />
    ),
  ];
  return (
    <FormCard title={`Drop Form`}>
      <Table className={classes.table}>
        <TableHead></TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                width={row.label == "drops" ? "10%" : ""}
                component="th"
                scope="row"
              >
                {row.label}
              </TableCell>
              <TableCell align="right">{row.field}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormCard>
  );
}

export default connect(
  null,
  null
)(
  reduxForm({
    form: "shiftForm",
  })(Drop)
);
