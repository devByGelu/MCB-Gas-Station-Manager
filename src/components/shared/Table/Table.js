import React from 'react'
import { TableRow } from './TableRow'
import { reduxForm } from 'redux-form'
const Table = (props) => {
  const tableHeadings = (headings) =>
    headings.map((heading) => <th scope='col'>{heading}</th>)
    const renderRows = (rows) => rows.map((row)=><TableRow row={row}/>)
  return (
    <table class='table'>
      <thead class='thead-dark'>
        <tr>{tableHeadings(props.headings)}</tr>
      </thead>
      <tbody>
        {
          <>
            {renderRows(props.rows)}
          </>
        }
      </tbody>
    </table>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(Table)
