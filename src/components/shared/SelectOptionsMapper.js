import React from 'react'

const SelectOptionsMapper = ({ items, values }) => {
  return (
    <>
      {items.map((item, index) =>
        values ? (
          <option value={values[index]}>{item}</option>
        ) : (
          <option value={item}>{item}</option>
        )
      )}
    </>
  )
}
export default SelectOptionsMapper
