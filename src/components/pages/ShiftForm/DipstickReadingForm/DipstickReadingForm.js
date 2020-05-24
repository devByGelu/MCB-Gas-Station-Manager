import React, { Component } from 'react'
import RenderField from '../AdvanceReadingForm/RenderField'
import Table from '../../../shared/Table/Table'
import { reduxForm } from 'redux-form'
export const DipstickReadingForm = () => {
  const renderFieldFormat = (type, name, step) => (
    <RenderField type={type} name={name} step={step} />
  )
  return (
    <>
      <Table
        headings={['Product', 'Opening', 'Closing']}
        rows={[
          [
            'Diesel',
            renderFieldFormat('number', 'Diesel-Opening', '0.001'),
            renderFieldFormat('number', 'Diesel-Closing', '0.001'),
          ],
          [
            'Jx Premium',
            renderFieldFormat('number', 'JxPremium-Opening', '0.001'),
            renderFieldFormat('number', 'JxPremium-Closing', '0.001'),
          ],
          [
            'Accelrate',
            renderFieldFormat('number', 'Accelrate-Opening', '0.001'),
            renderFieldFormat('number', 'Accelrate-Closing', '0.001'),
          ],
        ]}
      />
    </>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(DipstickReadingForm)
