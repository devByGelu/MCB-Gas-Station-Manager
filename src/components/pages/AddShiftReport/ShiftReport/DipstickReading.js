import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    maxWidth: 1100,
    fontSize: 3,
  },
  tableText: {
    fontSize: 12,
  },
  resize: {
    fontSize: 10,
  },
});
function DipstickReading({ number }) {
  const classes = useStyles();
  function createData(pName) {
    const fields = ["oLvl", "oLit", "cLvl", "cLit"];
    let data = {};
    data.pName = pName;
    fields.forEach(
      (f) =>
        (data[f] = (
          <Field
            inputProps={{ style: { fontSize: 11 } }}
            // InputLabelProps={{ style: { fontSize: 40 } }}
            name={`${pName}.${f}`}
            component={renderTextField}
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
    <FormCard title={`Pump ${number}`} key={nextId()}>
      <Table className={classes.table} size="small">
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.pName}
              </TableCell>
              <TableCell align="right">{row.oLvl}</TableCell>
              <TableCell align="right">{row.oLit}</TableCell>
              <TableCell align="right">{row.cLvl}</TableCell>
              <TableCell align="right">{row.cLit}</TableCell>
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
  })(DipstickReading)
);
