import React from "react"

import nextId from "react-id-generator"
const SelectOptionsMapper = ({ items, values }) => {
  return (
    <>
      <option key={nextId()} value={null}>
        {null}
      </option>
      {items.map((item, index) =>
        values ? (
          <option key={nextId()} value={values[index]}>
            {item}
          </option>
        ) : (
          <option key={nextId()} value={item}>
            {item}
          </option>
        )
      )}
    </>
  )
}
export default SelectOptionsMapper
