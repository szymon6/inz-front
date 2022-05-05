import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'

const New = () => {
  const { tableName } = useParams()

  const [notFound, setNotFound] = useState(false)
  const [tableDisplayName, setTableDisplayName] = useState('')
  const navigate = useNavigate()

  async function fetch() {
    //fetch display name
    const { data: tableInfo, error } = await api.get(`info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)
  }

  useEffect(() => {
    fetch()
  }, [])

  if (notFound) return <div>Table not found</div>
  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" color="initial">
          New record for {tableDisplayName}
        </Typography>
      </header>
      <Box>
        <TextField label="lab" required />
      </Box>

      <Button
        variant="text"
        color="primary"
        onClick={() => navigate(`/table/${tableName}`)}
      >
        Back
      </Button>
    </div>
  )
}

export default New
