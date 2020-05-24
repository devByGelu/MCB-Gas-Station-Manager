import React from 'react'

export const TableRow = ({ row }) => {
  const format = () =>
    row.map((content, index) => {
      if (index === 0) {
        return <th scope='col'>{content}</th>
      } else {
        return <th scope='row>'>{content}</th>
      }
    })
  return <tr>{format()}</tr>
}
