import Edit from '@mui/icons-material/Edit'
import ListAlt from '@mui/icons-material/ListAlt'
import OpenInNew from '@mui/icons-material/OpenInNew'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import EditDropdownDialog from './DraggableDialog'

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
  const [open, setOpen] = useState(false)
  return (
    <>
      {open && <EditDropdownDialog close={() => setOpen(false)} />}

      <Tooltip title="Edit dropdown">
        <IconButton onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  )
}