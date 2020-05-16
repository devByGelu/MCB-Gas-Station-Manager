import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

function PumpInput(props) {
  return (
    <div class='input-group mb-3'>
      <div class='input-group-prepend'>
        <span
          class='input-group-text'
          id={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
        >
          {props.label}
        </span>
      </div>
      <Field
        component='input'
        type='number'
        name={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
        id={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
        class='form-control'
        placeholder={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
        aria-label={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
        aria-describedby={('pump-'+ props.pumpNumber+ '-'+ props.label+'-'+props.product)}
      />
    </div>
  )
}

PumpInput.propTypes = {}

export default PumpInput
