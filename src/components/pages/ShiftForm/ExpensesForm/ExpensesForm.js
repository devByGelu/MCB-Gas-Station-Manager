import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import RenderField from '../AdvanceReadingForm/RenderField'
import Table from '../../../shared/Table/Table'
import nextId from 'react-id-generator'

const ExpensesForm = (props) => {
  const renderExpenses = ({ fields }) => {
    if (fields.length < 1) {
      fields.push({ id: nextId() })
      return []
    }

    const renderFieldFormat = (
      type,
      name,
      step,
      index,
      withAddBtn,
      withDelBtn
    ) => {
      let newId = nextId()
      return (
        <RenderField
          key={newId}
          fieldId={newId}
          type={type}
          name={name}
          step={step}
          small={true}
          fields={fields}
          withAddBtn={withAddBtn}
          withDelBtn={withDelBtn}
          index={index}
        />
      )
    }
    const getExpenses = () => {
      let collection = []
      let subcollection = []

      fields.forEach((el, index) => {
        subcollection.push(
          renderFieldFormat(
            'text',
            'expenseDescription' + '-' + index,
            '0.01',
            index,
            false,
            false
          )
        )

        subcollection.push(
          renderFieldFormat(
            'number',
            'expensesAmt' + '-' + index,
            '0.001',
            index,
            index === 0 ? true : false,
            index === 0 ? true : false
          )
        )
        collection.push(subcollection)
        subcollection = []
      })
      return collection
    }
    return (
      <>
        <Table headings={['Description', 'Amount']} rows={getExpenses()} />
      </>
    )
  }
  return (
    <>
      <FieldArray name='expenses' component={renderExpenses} />
    </>
  )
}

export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ExpensesForm)
