import { Autocomplete, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = ({ f, handleChange, dropdown = false }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    api
      .get(
        dropdown
          ? `options/dropdown/${f.referenceToDropdownId}`
          : `options/table/${f.referenceToId}`
      )
      .then(({ data }) => setOptions(data))
  }, [])

  console.log(f)

  return (
    <Autocomplete
      fullWidth
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={f.displayName} required={f.required} />
      )}
      onChange={(_, value) => {
        handleChange(f.name, value != null ? value.value : null)
      }}
    />
  )
}

const DateField = ({ f, handleChange }) => {
  const [empty, setEmpty] = useState(true)

  return (
    <TextField
      fullWidth
      label={f.displayName}
      type="date"
      // required={f.required}
      sx={{
        '*::-webkit-datetime-edit': {
          color: empty ? 'transparent' : '#000',
        },
        '*:focus::-webkit-datetime-edit': { color: '#000' },
      }}
      onChange={(e) => {
        setEmpty(e.target.value == '')
        //handleChange(f.name, data)
      }}
    />
  )
}

const Field = ({ f, handleChange, number = false }) => (
  <TextField
    fullWidth
    label={f.displayName}
    type={f.type}
    //  required={f.required}
    onChange={(e) => {
      let data = e.target.value
      if (number) data = data != '' ? +data : null //because +'' makes 0
      else data = data.trim()
      handleChange(f.name, data)
    }}
  />
)

const FormField = (p) => (
  <Box my={2}>
    {(() => {
      switch (p.f.type) {
        case 'reference':
          return <ReferenceField {...p} />
        case 'dropdown':
          return <ReferenceField dropdown {...p} />
        case 'date':
          return <DateField dropdown {...p} />
        case 'number':
          return <Field number {...p} />
        default:
          return <Field {...p} />
      }
    })()}
  </Box>
)

export default FormField

//TODO użycie hooka z context do przesłania funckji chandle submit
//dokocznie na 2 pozostałych
