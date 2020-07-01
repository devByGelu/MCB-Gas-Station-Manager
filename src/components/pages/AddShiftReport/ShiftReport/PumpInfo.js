import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { TextField } from "@material-ui/core"
import nextId from "react-id-generator"
import { FieldArray, reduxForm, Field } from "redux-form"
import { connect } from "react-redux"
import renderTextField from "../../../shared/renderTextField"
import FormCard from "./FormCard"

const useStyles = makeStyles({
  table: {
    maxWidth: 1100,
    fontSize: 3
  },
  tableText: {
    fontSize: 12,
  },
})
function PumpInfo({number}) {
  const classes = useStyles()
  function createData(pName) {
    return {
      pName,
      advRd: <Field variant='outlined' name={`pump${number}.${pName}.advRd`} component={renderTextField} />,
      end: <Field variant='outlined' name={`pump${number}.${pName}.end`} component={renderTextField} />,
      beg: <Field variant='outlined' name={`pump${number}.${pName}.beg`} component={renderTextField} />,
      cal: <Field variant='outlined' name={`pump${number}.${pName}.cal`} component={renderTextField} />,
      mgn: <Field variant='outlined' name={`pump${number}.${pName}.mgn`} component={renderTextField} />,
      lSold: <Field variant='outlined' name={`pump${number}.${pName}.lSold`} component={renderTextField} />,
      cLSold: <Field variant='outlined' name={`pump${number}.${pName}.cLSold`} component={renderTextField} />,
      sales: <Field variant='outlined' name={`pump${number}.${pName}.sales`} component={renderTextField} />,
      income: <Field variant='outlined' name={`pump${number}.${pName}.income`} component={renderTextField} />,
    }
  }
  const rows = [createData("diesel"),createData("jxpremium"),createData("accelrate")]
  return (
    <FormCard title='Pump1' key={nextId()}>
      <Table
         className={classes.table}
        size='small'>
        <TableHead>
          <TableRow>
            <TableCell>PRODUCT</TableCell>
            <TableCell align='right'>ADV RDNG</TableCell>
            <TableCell align='right'>END</TableCell>
            <TableCell align='right'>BEG</TableCell>
            <TableCell align='right'>CAL</TableCell>
            <TableCell align='right'>MGN</TableCell>
            <TableCell align='right'>L SOLD</TableCell>
            <TableCell align='right'>CAL L SOLD</TableCell>
            <TableCell align='right'>SALES</TableCell>
            <TableCell align='right'>INCOME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.pName}
              </TableCell>
              <TableCell align='right'>{row.advRd}</TableCell>
               <TableCell align='right'>{row.end}</TableCell>
               <TableCell align='right'>{row.beg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormCard>
  )
}

export default connect(
  null,
  null
)(
  reduxForm({
    form: "shiftForm",
  })(PumpInfo)
)
