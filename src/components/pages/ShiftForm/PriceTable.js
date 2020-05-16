import React from 'react'
import PriceTableRow from './PriceTableRow'

export const PriceTable = () => {
  return (
    <React.Fragment>
      <h1>Price</h1>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>Pump 1 & 2</th>
            <th scope='col'>Pump 3 & 4</th>
          </tr>
        </thead>
        <tbody>
          <PriceTableRow productName='Diesel' />
          <PriceTableRow productName='Accelrate' />
          <PriceTableRow productName='JxPremium' />
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default PriceTable
