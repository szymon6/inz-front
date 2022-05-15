import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import FormField from '../../components/FormField'

const New = () => {
  const { tableName } = useParams()

  const [notFound, setNotFound] = useState(false)
  const [tableDisplayName, setTableDisplayName] = useState('')
  const [fields, setFields] = useState([])
  const navigate = useNavigate()

  const { register, setValue, handleSubmit } = useForm()

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

  async function submit(data) {
    console.log(data)

    await api.post(`table/${tableName}`, data)
    navigate(`/table/${tableName}`)
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
          <form onSubmit={handleSubmit(submit)}>
            <Box sx={{ mt: 2 }}>
              {fields.map((f) => (
                <FormField
                  key={f.id}
                  f={f}
                  register={register(f.name, {
                    valueAsNumber: f.type == 'number',
                  })}
                  setValue={setValue}
                />
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
