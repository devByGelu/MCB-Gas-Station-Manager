import React from 'react'
import RenderField from './RenderField'
import FormHeader from '../../../shared/FormHeader/FormHeader'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core'
import renderFieldArray from '../../../shared/renderFieldArray'
import FormCard from '../../../shared/FormCard'

const AdvanceReadingForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormCard title='Advance Reading'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Pump</TableCell>
            <TableCell align='left'>Diesel(L)</TableCell>
            <TableCell align='left'>Accelrate(L)</TableCell>
            <TableCell align='left'>Jx Premium(L)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <FieldArray
            name='advanceReading'
            component={renderFieldArray}
            type='advanceReading'
          />
        </TableBody>
      </Table>
      </FormCard>
      <button type='submit'>submit!g2!</button>
    </form>
  )
}
export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // onSubmit: submit,
  validate,
})(AdvanceReadingForm)
