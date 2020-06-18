import React, { Component, useEffect } from 'react'
import RenderField from '../AdvanceReadingForm/RenderField'
// import Table from '../../../shared/Table/Table'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from '../../../shared/renderField'
import validate from '../../../shared/validate'
import {
  TableBody,
  TableHead,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core'
import renderFieldArray from '../../../shared/renderFieldArray'
import FormCard from '../../../shared/FormCard'

// import submit from '../../../shared/submit'

export const DipstickReadingForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormCard title='Dipstick Reading'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='left'>Opening</TableCell>
              <TableCell align='left'>Closing</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <FieldArray
              name='dipstick'
              component={renderFieldArray}
              type='dipstick'
            />
          </TableBody>
        </Table>
      </FormCard>
      <button type='submit'>submit!!!</button>
    </form>
  )
}
export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
  // onSubmit: submit,
})(DipstickReadingForm)
