import React from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderSelectField from './renderSelectField'
const SaveBtn = (props) => {
  return (
    <Field
      name='favoriteColor'
      component={renderSelectField}
      label='Favorite Color'>
      <option value='' />
      <option value={'ff0000'}>Red</option>
      <option value={'00ff00'}>Green</option>
      <option value={'0000ff'}>Blue</option>
    </Field>
  )
}

export default SaveBtn
