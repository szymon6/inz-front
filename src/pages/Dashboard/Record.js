import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import FormField from '../../components/FormField'
import LinkedList from '../../components/LinkedList'

const Record = ({ isNew }) => {
  const { tableName, id } = useParams()

  const [notFound, setNotFound] = useState(false)
  const [tableDisplayName, setTableDisplayName] = useState('')
  const [fields, setFields] = useState([])
  const [data, setData] = useState({})
  const [providedData, setProvidedData] = useState({})
  const [pressedButton, setPressedButton] = useState(null)

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
    setNotFound(false)
    setTableDisplayName('')
    setFields([])
    setData([])
    setPressedButton(null)

    fetchColumns()
    if (!isNew) fetchData()
  }, [tableName, id])

  useEffect(() => {
    console.log(providedData)
  }, [providedData])

  const handleChange = (key, data) => {
    setProvidedData({
      ...providedData,
      [key]: data,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = isNew ? postNew : update
    action()
      .then(({ success, id }) => {
        if (!success) return
        if (pressedButton == 'submit') navigate(`/table/${tableName}`)
        else if (pressedButton == 'save' && isNew)
          navigate(`/table/${tableName}/${id}`)
      })
      .then(setPressedButton(null))
  }

  const isEmpty = (obj) => Object.keys(obj).length === 0

  async function postNew() {
    const { data, error } = await api.post(`table/${tableName}`, providedData)
    if (error) {
      alert(
        'record could not be added, check if you provided valid data, or if records already exist'
      )
      return { success: false }
    }
    return { success: false, id: data?.id }
  }

  async function update() {
    if (isEmpty(providedData)) return
    const { error } = await api.patch(
      `table/${tableName}/${data.id}`,
      providedData
    )

    if (error) {
      alert(
        'record could not be updated, check if you provided valid data, or if records already exist'
      )
      return { success: false }
    } else {
      setProvidedData({})
      return { success: true }
    }
  }

  if (notFound) return <div>Table not found</div>
  if (!isNew && isEmpty(data)) return null

  const disabledButtons = !isNew && isEmpty(providedData)

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          color="primary"
          onClick={() => navigate(-1)}
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
              {fields.map((f) => {
                return (
                  <FormField
                    key={f.id}
                    f={f}
                    handleChange={handleChange}
                    data={data[f.name]}
                  />
                )
              })}
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
              <Button
                type="submit"
                variant="outlined"
                disabled={disabledButtons}
                onClick={() => setPressedButton('save')}
              >
                Save
              </Button>
              <Button
                type="submit"
                disabled={disabledButtons}
                variant="contained"
                onClick={() => setPressedButton('submit')}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <br />
      {!isNew && <LinkedList table={tableName} id={id} />}
    </div>
  )
}

export default Record
