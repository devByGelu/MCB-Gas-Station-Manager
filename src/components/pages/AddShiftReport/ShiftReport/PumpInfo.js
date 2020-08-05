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
import { createNumberMask } from "redux-form-input-masks";
import { togglePumpInfoField } from "../../../../actions";

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

function PumpInfo({
  pumpInfoFields,
  isFieldDisabled,
  number,
  change,
  togglePumpInfoField,
}) {
  const classes = useStyles();

  const isDisabled = (f, product) => {
    if ((f === "beg" || isFieldDisabled) && (f !== "mgn" || f !== "cal"))
      return true;
    else if (f === "mgn" || f === "cal") return pumpInfoFields[product][f];
    else return isFieldDisabled;
  };
  function handleBlur(field, product) {
    if ((field === "cal" || field === "mgn") && !isFieldDisabled)
      togglePumpInfoField(number, field, product, true);
  }
  function handleDoubleClick(field, product) {
    if ((field === "cal" || field === "mgn") && !isFieldDisabled)
      togglePumpInfoField(number, field, product, false);
  }
  function createData(pName) {
    const fields = ["advRd", "end", "beg", "cal", "mgn"];
    let data = {};
    data.pName = pName;
    fields.forEach(
      (f) =>
        (data[f] = (
          <Field
            onBlur={() => handleBlur(f, pName)}
            onDoubleClick={() => handleDoubleClick(f, pName)}
            type="tel"
            disabled={isDisabled(f, pName)}
            variant="outlined"
            name={`pump${number}.${pName}.${f}`}
            component={renderTextField}
            {...createNumberMask({
              decimalPlaces:
                f === "advRd" ? 2 : f === "cal" || f === "mgn" ? 1 : 3,
              allowEmpty: f === "advRd" ? false : true,
              allowNegative: false,
            })}
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
            <TableCell>FUEL</TableCell>
            <TableCell align="right">ADV RDNG</TableCell>
            <TableCell align="right">END</TableCell>
            <TableCell align="right">BEG</TableCell>
            <TableCell align="right">CAL</TableCell>
            <TableCell align="right">MGN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell width="5%" component="th" scope="row">
                {row.pName === "diesel"
                  ? "DSL"
                  : row.pName === "accelrate"
                  ? "ACL"
                  : "JXP"}
              </TableCell>
              <TableCell align="right">{row.advRd}</TableCell>
              <TableCell width="25%" align="right">
                {row.end}
              </TableCell>
              <TableCell width="25%" align="right">
                {row.beg}
              </TableCell>
              <TableCell align="right">{row.cal}</TableCell>
              <TableCell align="right">{row.mgn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormCard>
  );
}
const mapStateToProps = (state, ownProps) => ({
  pumpInfoFields: state.pumpInfoFields[`pump${ownProps.number}`],
});
export default connect(mapStateToProps, { togglePumpInfoField })(
  reduxForm({
    form: "shiftForm",
  })(PumpInfo)
);
