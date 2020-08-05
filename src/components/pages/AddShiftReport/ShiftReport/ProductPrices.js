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
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
const currencyMask = createNumberMask({
  prefix: 'PHP',
  decimalPlaces: 2,
  allowNegative: false
})
const useStyles = makeStyles({
  table: {
    fontSize: 3,
  },
  tableText: {
    fontSize: 12,
  },
  resize: {
    fontSize: 10,
  },
});
function ProductPrices({isFieldDisabled}) {
  const classes = useStyles();
  function createData(groupNum) {
    const fields = ["diesel", "jxpremium", "accelrate"];
    let data = {};
    fields.forEach(
      (f) =>
        (data[f] = (
          <Field
              disabled={isFieldDisabled}
            type="tel"
            {...currencyMask}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            name={`${groupNum}.${f}`}
            variant="outlined"
            component={renderTextField}
          />
        ))
    );
    return data;
  }
  let rows = [createData("group1"), createData("group2")];
  return (
    <FormCard title={`Price`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Diesel</TableCell>
            <TableCell align="center">JxPremium</TableCell>
            <TableCell align="center">Accelrate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell width="15%" align="right">
                {row.diesel}
              </TableCell>
              <TableCell width="15%" align="right">
                {row.jxpremium}
              </TableCell>
              <TableCell width="15%" align="right">
                {row.accelrate}
              </TableCell>
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
  })(ProductPrices)
);
