import React from 'react'
import renderSelectField from './renderSelectField'
import { Field } from 'redux-form'
import SelectOptionsMapper from './SelectOptionsMapper'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import renderTextField from './renderTextField'
const renderFieldArray = ({
  fields,
  type,
  items,
  values,
  employees,
  meta: { error, submitFailed },
}) => {
  if (type === 'pumpAttendants')
    return fields.map((field, index) => (
      <>
        <Field
          name={`${field}.PA`}
          label='Attendant'
          id={`${field}.PA`}
          fields={fields}
          index={index}
          component={renderSelectField}>
          <SelectOptionsMapper items={items} values={values} />
        </Field>
      </>
    ))
  else if (type === 'pumpPrices') {
    const rowNames = ['Pump 1-2', 'Pump 3-4']
    const cells = ['diesel', 'accelrate', 'jxpremium']
    return fields.map((field, index) => (
      <TableRow>
        <TableCell component='th' scope='row'>
          {rowNames[index]}
        </TableCell>
        {cells.map((cellName) => (
          <TableCell align='right'>
            <Field
              name={`${field}.${cellName}`}
              component={renderTextField}
              label='Price'
            />
          </TableCell>
        ))}
      </TableRow>
    ))
  }
}

export default renderFieldArray
