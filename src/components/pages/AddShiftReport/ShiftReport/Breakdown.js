import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, Grid, List, ListItem } from "@material-ui/core";
import nextId from "react-id-generator";
import { FieldArray, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import renderTextField from "../../../shared/renderTextField";
import FormCard from "./FormCard";
const StyledListItem = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})(ListItem);
function Breakdown({ number }) {
  function createData(label, field) {
    return { label, field };
  }
  const getRows = () => {
    let rows = [];
    let vals = [
      "1000",
      "500",
      "200",
      "100",
      "50",
      "20",
      "10",
      "5",
      "1",
      "0.25",
    ];
    vals.forEach((val) =>
      rows.push({
        label: val,
        field: (
          <Field
            component={renderTextField}
            variant="outlined"
            name={`breakdown.count${val}`}
          />
        ),
      })
    );
    return rows;
  };
  let rows = getRows();
  return (
    <FormCard title={`Breakdown`} >
      <Table>
        <TableHead></TableHead>
        <TableBody>
          <List style={{ maxHeight: 190, overflow: "auto" }}>
            {rows.map((row,index) => (
              <StyledListItem key={index} disableGutters={true}>
                <TableRow >
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell width="40%" align="right">
                    {row.field}
                  </TableCell>
                </TableRow>
              </StyledListItem>
            ))}
          </List>
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
  })(Breakdown)
);
