import React from 'react'
import Table from '../../../shared/Table/Table'
import RenderField from '../AdvanceReadingForm/RenderField'
const DropForm = (props) => {
  const renderFieldFormat = (type, name, step) => (
    <RenderField type={type} name={name} step={step} />
  )
  return (
    <>
      <Table
        headings={['', 'Amount']}
        rows={[
          ['Drops', renderFieldFormat('number', 'drops-quantity', '0.001')],
          [
            'Amount/Drop',
            renderFieldFormat('number', 'amount-per-drop', '0.001'),
          ],
          ['Last Drop', renderFieldFormat('number', 'last-drop', '0.001')],
        ]}
      />
    </>
  )
}

export default DropForm
