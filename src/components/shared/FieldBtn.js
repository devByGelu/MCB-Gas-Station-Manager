import React from 'react'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp'
import IconButton from '@material-ui/core/IconButton'
const FieldBtn = ({ fields, index, type }) => {
  if (index == 0)
    return (
      <IconButton onClick={() => fields.push({})}>
        <AddSharpIcon fontSize='small' />
      </IconButton>
    )
  else
    return (
      <IconButton onClick={() => fields.remove(index)}>
        <RemoveSharpIcon fontSize='small' />
      </IconButton>
    )
}

export default FieldBtn
