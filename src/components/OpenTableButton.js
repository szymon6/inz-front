import ListAlt from '@mui/icons-material/ListAlt'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
const OpenTableButton = ({ table }) => {
  return (
    <Tooltip title="Open table">
      <IconButton onClick={() => window.open(`/table/${table}`, '_blank')}>
        <ListAlt />
      </IconButton>
    </Tooltip>
  )
}

export default OpenTableButton
