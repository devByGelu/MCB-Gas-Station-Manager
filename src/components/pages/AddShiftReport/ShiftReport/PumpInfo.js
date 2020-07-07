import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField } from "@material-ui/core";
import nextId from "react-id-generator";
import { FieldArray, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";
const useStyles = makeStyles({
  table: {
    maxWidth: 2000,
    fontSize: 3,
  },
  tableText: {
    fontSize: 12,
  },
  resize: {
    fontSize: 10,
  },
});
function PumpInfo({ number }) {
  const classes = useStyles();
  function createData(pName) {
    const fields = [
      "advRd",
      "end",
      "beg",
      "cal",
      "mgn",
      "lSold",
      "cLSold",
      "sales",
      "income",
    ];
    let data = {};
    data.pName = pName;
    fields.forEach(
      (f) =>
        (data[f] = (
          <Field
            variant="outlined"
            name={`pump${number}.${pName}.${f}`}
            component={renderTextField}
          />
        ))
    );
    return data;
  }
  let rows = [
    createData("diesel"),
    createData("accelrate"),
    createData("jxpremium"),
  ];
  if (number == 2 || number == 4)
    rows = [
      createData("jxpremium"),
      createData("accelrate"),
      createData("diesel"),
    ];
  return (
    <FormCard title={`Pump ${number}`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>PRODUCT</TableCell>
            <TableCell align="right">ADV RDNG</TableCell>
            <TableCell align="right">END</TableCell>
            <TableCell align="right">BEG</TableCell>
            <TableCell align="right">CAL</TableCell>
            <TableCell align="right">MGN</TableCell>
            <TableCell align="right">L SOLD</TableCell>
            <TableCell align="right">CAL L SOLD</TableCell>
            <TableCell align="right">SALES</TableCell>
            <TableCell align="right">INCOME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.pName}
              </TableCell>
              <TableCell align="right">{row.advRd}</TableCell>
              <TableCell align="right">{row.end}</TableCell>
              <TableCell align="right">{row.beg}</TableCell>
              <TableCell width="7%" align="right">
                {row.cal}
              </TableCell>
              <TableCell width="7%" align="right">
                {row.mgn}
              </TableCell>
              <TableCell align="right">{row.lSold}</TableCell>
              <TableCell align="right">{row.cLSold}</TableCell>
              <TableCell align="right">{row.sales}</TableCell>
              <TableCell align="right">{row.income}</TableCell>
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
  })(PumpInfo)
);
