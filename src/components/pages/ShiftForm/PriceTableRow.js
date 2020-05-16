import React from 'react'
import { Field } from 'redux-form'

export const PriceTableRow = (props) => {
  return (
    <React.Fragment>
      <tr>
        <th scope='row'>{props.productName}</th>
        <td>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>PHP</span>
            </div>
            <Field
              component='input'
              name={'pump-1-2-' + props.productName}
              id={'pump-1-2-' + props.productName}
              placeholder={'pump-1-2-' + props.productName}
              type='number'
              step='0.001'
              className='form-control'
              aria-label='Amount (to the nearest dollar)'
            />
          </div>
        </td>
        <td>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>PHP</span>
            </div>
            <Field
              component='input'
              name={'pump-3-4-' + props.productName}
              id={'pump-3-4-' + props.productName}
              placeholder={'pump-3-4-' + props.productName}
              step='0.001'
              className='form-control'
              aria-label='Amount (to the nearest dollar)'
            />
          </div>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default PriceTableRow
