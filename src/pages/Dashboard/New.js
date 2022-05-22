import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import FormField from '../../components/FormField'

const New = () => {
  const { tableName } = useParams()

  const [notFound, setNotFound] = useState(false)
  const [tableDisplayName, setTableDisplayName] = useState('')
  const [fields, setFields] = useState([])
  const navigate = useNavigate()

  async function fetch() {
    //fetch display name
    const { data: tableInfo, error } = await api.get(`table-info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    setFields(tableInfo.columns)
  }

  useEffect(() => {
    fetch()
  }, [])

  const [formData, setFormData] = React.useState({})

  const handleChange = (key, data) => {
    setFormData({
      ...formData,
      [key]: data,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // api
    //   .post(`table/${tableName}`, formData)
    //   .then(navigate(`/table/${tableName}`))
  }

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
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box minWidth="400px" width="40%">
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 2 }}>
              {fields.map((f) => (
                <FormField key={f.id} field={f} handleChange={handleChange} />
              ))}
            </Box>

            <Box>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate(`/table/${tableName}`)}
              >
                Back
              </Button>

              <Button type="submit">Add</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default New
