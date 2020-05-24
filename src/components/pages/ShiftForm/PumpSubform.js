import React from 'react'

import PumpInput from './PumpInput'
import PumpSubformNavLink from './PumpSubformNavLink'

function PumpSubform(props) {
  const { isActive } = props
  return (
    <React.Fragment>
      <div className='card w-100 mb-3'>
        <div class='card text-center'>
          <div class='card-header'>
            <ul class='nav nav-pills card-header-pills'>
              <PumpSubformNavLink label={props.pumpNumber} />
            </ul>
            <ul class='ml-1 nav nav-pills card-header-pills'>
              <PumpSubformNavLink
                label='Diesel'
                isClickAble={true}
                pumpNumber={props.pumpNumber}
              />
              <PumpSubformNavLink
                label='Accelrate'
                isClickAble={true}
                pumpNumber={props.pumpNumber}
              />
              <PumpSubformNavLink
                label='JxPremium'
                isClickAble={true}
                pumpNumber={props.pumpNumber}
              />
            </ul>
          </div>
          <div class='card-body'>
            <div class={isActive('Diesel')}>
              {/* DIESEL */}
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='END'
                product='Diesel'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='CAL'
                product='Diesel'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='MGN'
                product='Diesel'
              />
            </div>
            {/* ACCELRATE */}
            <div class={isActive('Accelrate')}>
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='END'
                product='Accelrate'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='CAL'
                product='Accelrate'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='MGN'
                product='Accelrate'
              />
            </div>
            {/* JXPREMIUM */}
            <div class={isActive('JxPremium')}>
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='END'
                product='JxPremium'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='CAL'
                product='JxPremium'
              />
              <PumpInput
                pumpNumber={props.pumpNumber}
                label='MGN'
                product='JxPremium'
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PumpSubform
