import Edit from '@mui/icons-material/Edit'
import ListAlt from '@mui/icons-material/ListAlt'
import OpenInNew from '@mui/icons-material/OpenInNew'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import DropdownDialog from '../store/DropdownDialog'
import { useFieldContext } from './FormField'

export const OpenTableButton = ({ table }) => {
  return (
    <Tooltip title="Open table">
      <IconButton onClick={() => window.open(`/table/${table}`, '_blank')}>
        <ListAlt />
      </IconButton>
    </Tooltip>
  )
}

export const OpenRecordButton = ({ table, id }) => {
  return (
    <Tooltip title="Open Record">
      <IconButton
        onClick={() => window.open(`/table/${table}/${id}`, '_blank')}
      >
        <OpenInNew />
      </IconButton>
    </Tooltip>
  )
}

export const EditDropdownButton = ({ dropdown }) => {
  const { reload } = useFieldContext()

  return (
    <>
      <Tooltip title="Edit dropdown">
        <IconButton onClick={() => DropdownDialog.open(dropdown, reload)}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  )
}
