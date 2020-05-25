import React from 'react'
import RenderField from './RenderField'
import { Field, reduxForm } from 'redux-form'
import FormHeader from '../../../shared/FormHeader/FormHeader'

const AdvanceReadingForm = () => {
  return (
    <React.Fragment>
      
<FormHeader text='Advance Reading'/>
      <RenderField
        type={'number'}
        name={'Pump-1-AR'}
        label={'Pump 1'}
        step={'0.01'}
      />
      <RenderField
        type={'number'}
        name={'Pump-2-AR'}
        label={'Pump 2'}
        step={'0.01'}
      />
      <RenderField
        type={'number'}
        name={'Pump-3-AR'}
        label={'Pump 3'}
        step={'0.01'}
      />
      <RenderField
        type={'number'}
        name={'Pump-4-AR'}
        label={'Pump 4'}
        step={'0.01'}
      />
    </React.Fragment>
  )
}
export default reduxForm({
  form: 'shiftForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(AdvanceReadingForm)
