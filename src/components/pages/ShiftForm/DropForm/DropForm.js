import React from 'react'
import Table from '../../../shared/Table/Table'
import RenderField from '../AdvanceReadingForm/RenderField'
import FormHeader from '../../../shared/FormHeader/FormHeader'
const DropForm = (props) => {
  const renderFieldFormat = (type, name, step) => (
    <RenderField type={type} name={name} step={step} small={true} />
  )
  return (
    <>
      <div className='row'>
        <div className='col'>
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
        </div>
        <div className='col-md'>
          <Table
            headings={['Denomination', 'Quantity']}
            rows={[
              ['1000.00', renderFieldFormat('number', 'QTY-1000')],
              ['500.00', renderFieldFormat('number', 'QTY-500')],
              ['200.00', renderFieldFormat('number', 'QTY-200')],
              ['100.00', renderFieldFormat('number', 'QTY-500')],
              ['50.00', renderFieldFormat('number', 'QTY-50')],
              ['20.00', renderFieldFormat('number', 'QTY-20')],
              ['10.00', renderFieldFormat('number', 'QTY-10')],
              ['5.00', renderFieldFormat('number', 'QTY-5')],
              ['1.00', renderFieldFormat('number', 'QTY-1')],
              ['0.25', renderFieldFormat('number', 'QTY-.25')],
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default DropForm
