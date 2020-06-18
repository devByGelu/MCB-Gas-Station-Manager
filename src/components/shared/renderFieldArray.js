import React from 'react'
import Grid from '@material-ui/core/Grid'
import renderSelectField from './renderSelectField'
import { Field } from 'redux-form'
import SelectOptionsMapper from './SelectOptionsMapper'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import ListItem from '@material-ui/core/ListItem'
import renderTextField from './renderTextField'
const renderFieldArray = ({
  fields,
  type,
  items,
  values,
  employees,
  meta: { error, submitFailed },
}) => {
  if (type === 'pumpAttendants') {
    return (
      <>
        {fields.map((field, index) => (
          <Grid item md={12}>
            <Field
              name={`${field}.PA`}
              // label='Attendant'
              id={`${field}.PA`}
              fields={fields}
              index={index}
              component={renderSelectField}>
              <SelectOptionsMapper items={items} values={values} />
            </Field>
          </Grid>
        ))}
      </>
    )
  } else if (type === 'pumpPrices') {
    const rowNames = ['Pump 1-2', 'Pump 3-4']
    const cells = ['diesel', 'accelrate', 'jxpremium']
    return fields.map((field, index) => (
      <TableRow>
        <TableCell component='th' scope='row'>
          {rowNames[index]}
        </TableCell>
        {cells.map((cellName) => (
          <TableCell align='left'>
            <Field
              name={`${field}.${cellName}`}
              component={renderTextField}
              // label='Price'
            />
          </TableCell>
        ))}
      </TableRow>
    ))
  } else if (type === 'advanceReading') {
    const rowNames = ['1', '2', '3', '4']
    const cells = ['diesel', 'accelrate', 'jxpremium']
    return fields.map((field, index) => (
      <TableRow>
        <TableCell component='th' scope='row'>
          {rowNames[index]}
        </TableCell>
        {cells.map((cellName) => (
          <TableCell align='left'>
            <Field
              name={`${field}.${cellName}`}
              component={renderTextField}
              // label={`${cellName} L`}
            />
          </TableCell>
        ))}
      </TableRow>
    ))
  } else if (type === 'dipstick') {
    const rowNames = ['Diesel', 'Accelrate', 'Jx Premium']
    const cells = [
      'openingLevel',
      'openingLiters',
      'closingLevel',
      'closingLiters',
    ]
    return fields.map((field, index) => (
      <TableRow>
        <TableCell component='th' scope='row'>
          {rowNames[index]}
        </TableCell>
        <TableCell align='left'>
          <Field
            name={`${field}.${cells[0]}`}
            component={renderTextField}
            helperText='level'
            // label={`${cellName} L`}
          />
          <br />
          <Field
            name={`${field}.${cells[1]}`}
            component={renderTextField}
            helperText='liters'
            // label={`${cellName} L`}
          />
        </TableCell>
        <TableCell align='left'>
          <Field
            name={`${field}.${cells[2]}`}
            component={renderTextField}
            helperText='level'
            // label={`${cellName} L`}
          />
          <br />
          <Field
            name={`${field}.${cells[3]}`}
            component={renderTextField}
            helperText='liters'
            // label={`${cellName} L`}
          />
        </TableCell>
      </TableRow>
    ))
  } else if (type === 'lastDropBreakdown') {
    return fields.map((field, index) => (
      <Grid
        item
        container
        style={{ flexWrap: 'nowrap', flexGrow: 0 }}
        direction='row'
        alignItems='flex-end'
        spacing={2}
        justify='flex-start'>
        <Grid item md={6}>
          <Field
            name={`${field}.denomination`}
            id={`${field}.denomination`}
            label='denomination'
            fields={fields}
            index={index}
            component={renderSelectField}>
            <SelectOptionsMapper
              items={[1000, 500, 200, 100, 50, 20, 10, 5, 1, 0.25]}
            />
          </Field>
        </Grid>
        <Grid item md={6}>
          <Field
            name={`${field}.quantity`}
            component={renderTextField}
            // helperText='quantity'
            label={`quantity`}
          />
        </Grid>
      </Grid>
    ))
  } else if (type === 'expenses') {
    return fields.map((field, index) => (
      <Grid
        item
        container
        style={{ flexWrap: 'nowrap', flexGrow: 0 }}
        direction='row'
        alignItems='flex-end'
        spacing={2}
        justify='flex-start'>
        <Grid item md={6}>
          <Field
            name={`${field}.description`}
            component={renderTextField}
            label='description'
            fields={fields}
            index={index}
          />
        </Grid>
        <Grid item md={6}>
          <Field
            name={`${field}.amount`}
            component={renderTextField}
            label='amount'
          />
        </Grid>
      </Grid>
    ))
  } else if (type === 'creditsales') {
    return fields.map((field, index) => (
      <Grid
        item
        container
        style={{ flexWrap: 'nowrap', flexGrow: 0 }}
        direction='row'
        alignItems='flex-end'
        spacing={2}
        justify='flex-start'>
        <Grid item md={6}>
          <Field
            name={`${field}.customer`}
            component={renderTextField}
            label='customer'
            fields={fields}
            index={index}
          />
        </Grid>
        <Grid item md={6}>
          <Field
            name={`${field}.amount`}
            component={renderTextField}
            label='amount'
          />
        </Grid>
      </Grid>
    ))
  } else if (type === 'cashadvance') {
    return fields.map((field, index) => (
      <Grid
        item
        container
        style={{ flexWrap: 'nowrap', flexGrow: 0 }}
        direction='row'
        alignItems='flex-end'
        spacing={2}
        justify='flex-start'>
        <Grid item md={6}>
          <Field
            name={`${field}.employee`}
            label='employee'
            id={`${field}.employee`}
            fields={fields}
            index={index}
            component={renderSelectField}>
            <SelectOptionsMapper items={items} values={values} />
          </Field>
        </Grid>
        <Grid item md={6}>
          <Field
            name={`${field}.amount`}
            component={renderTextField}
            label='amount'
          />
        </Grid>
      </Grid>
    ))
  }
}

export default renderFieldArray
