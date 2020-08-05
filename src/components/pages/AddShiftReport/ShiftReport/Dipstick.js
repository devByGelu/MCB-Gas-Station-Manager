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
const under2k = (value) => {
  if (value < 0) {
    return 0;
  } else if (value > 2000) {
    return parseInt(2000);
  } else {
    return value;
  }
};

function Dipstick({ number, isFieldDisabled }) {
  const classes = useStyles();
  function createData(pName) {
    const fields = [
      "openingLiters",
      "openingLevel",
      "closingLevel",
      "closingLiters",
    ];
    let data = {};
    data.pName = pName;
    fields.forEach(
      (f) =>
        (data[f] = (
          <Field
            name={`${pName}.${f}`}
            variant="outlined"
            type="tel"
            component={renderTextField}
            disabled={isFieldDisabled}
            {...createNumberMask({
              allowNegative: false,
            })}
          />
        ))
    );
    return data;
  }
  let rows = [
    createData("diesel"),
    createData("jxpremium"),
    createData("accelrate"),
  ];
  return (
    <FormCard title={`Dipstick Reading`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>PRODUCT</TableCell>
            <TableCell align="right">Opening Level</TableCell>
            <TableCell align="right">Opening Liters</TableCell>
            <TableCell align="right">Closing Level</TableCell>
            <TableCell align="right">Closing Liters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.pName}
              </TableCell>
              <TableCell width="15%" align="right">
                {row.openingLevel}
              </TableCell>
              <TableCell align="right">{row.openingLiters}</TableCell>
              <TableCell width="15%" align="right">
                {row.closingLevel}
              </TableCell>
              <TableCell align="right">{row.closingLiters}</TableCell>
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
  })(Dipstick)
);
