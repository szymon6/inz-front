import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import FormField from '../../components/FormField'

const Record = (p) => {
  const { tableName, id } = useParams()

  const [notFound, setNotFound] = useState(false)
  const [tableDisplayName, setTableDisplayName] = useState('')
  const [fields, setFields] = useState([])
  const [data, setData] = useState({})
  const navigate = useNavigate()

  async function fetchColumns() {
    //fetch display name
    const { data: tableInfo, error } = await api.get(`table-info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    setFields(tableInfo.columns)
  }

  async function fetchData() {
    let { data } = await api.get(`table/${tableName}/${id}`)
    setData(data)
  }

  useEffect(() => {
    fetchColumns()
    if (!p.new) fetchData()
  }, [])

  const [providedData, setProvidedData] = React.useState({})

  const handleChange = (key, data) => {
    setProvidedData({
      ...providedData,
      [key]: data,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(providedData)
    api
      .post(`table/${tableName}`, providedData)
      .then(navigate(`/table/${tableName}`))
  }

  function postNew() {
    //TODO
  }

  function update() {
    //TODO
  }

  if (notFound) return <div>Table not found</div>
  if (!p.new && Object.keys(data).length === 0) return <div>Loading...</div>
  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}
      >
        <IconButton
          color="primary"
          onClick={() => navigate(`/table/${tableName}`)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h5" color="initial">
          {tableDisplayName}
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
                <FormField
                  key={f.id}
                  f={f}
                  handleChange={handleChange}
                  data={data[f.name]}
                />
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                '& Button': {
                  ml: 2,
                },
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button variant="outlined">Save</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Record
