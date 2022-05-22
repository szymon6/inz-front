import { Autocomplete, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = ({ field, handleChange }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    api
      .get(
        field.type == 'dropdown'
          ? `options/dropdown/${field.referenceToDropdownId}`
          : `options/table/${field.referenceToId}`
      )
      .then(({ data }) => setOptions(data))
  }, [])

  return (
    <Autocomplete
      fullWidth
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.displayName}
          required={field.required}
        />
      )}
      onChange={(_, value) => {
        handleChange(field.name, value != null ? value.value : null)
      }}
    />
  )
}

const DateField = ({ f: field, handleChange }) => {
  const [empty, setEmpty] = useState(true)

  return (
    <TextField
      fullWidth
      label={field.displayName}
      type="date"
      required={field.required}
      sx={{
        '*::-webkit-datetime-edit': {
          color: empty ? 'transparent' : '#000',
        },
        '*:focus::-webkit-datetime-edit': { color: '#000' },
      }}
      onChange={(e) => {
        const data = e.target.value
        setEmpty(data == '')
        //   handleChange(f.name, new Date(data))
      }}
    />
  )
}

const Field = ({ field, handleChange }) => (
  <TextField
    fullWidth
    label={field.displayName}
    type={field.type}
    required={field.required}
    onChange={(e) => {
      let data = e.target.value
      if (field.type == 'number')
        data = data != '' ? +data : null //because +'' makes 0
      else data = data.trim()
      handleChange(field.name, data)
    }}
  />
)

const FormField = (p) => {
  const Input = (() => {
    switch (p.field.type) {
      case 'reference':
      case 'dropdown':
        return ReferenceField
      case 'date':
        return DateField
      default:
        return Field
    }
  })()

  return (
    <Box my={2}>
      <Input {...p} />
    </Box>
  )
}

export default FormField

//TODO użycie hooka z context do przesłania funckji chandle submit
//dokocznie na 2 pozostałych
