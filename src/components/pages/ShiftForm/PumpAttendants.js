import React from 'react'
import nextId from 'react-id-generator'

import EmployeeChooser from './EmployeeChooser'
// Rendering
//  get list of pump attendants already chosen
//      map each as separate employeechooser
// Adding
//  append id to list
//      default value is the first option on the list
// Updating
//  find index of source id, update it with new id
//  onChange handler calls update action

// Deleting
//  receive id, find its index then delete it

export const PumpAttendants = (props) => {
  const list = (employees, activePumpAttendants) =>
    activePumpAttendants.map((selector, index) => (
      //  If one only, show + to first
      //  If > 1, show + to first, show - to every employee chooser but not the first
      <div className='col-md'>
        <EmployeeChooser
          addButton={index === 0 ? true : false}
          employees={employees}
          key={selector.selectorId}
          name='Pump-Attendant'
          id={selector.selectorId}
          selected={selector.selected} // Already chosen by the user
        />
      </div>
    ))

  return (
    <React.Fragment>
      {list(props.employees, props.activePumpAttendants)}
    </React.Fragment>
  )
}

export default PumpAttendants
