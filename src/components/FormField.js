import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = ({ f, handleChange }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    api
      .get(
        f.type == 'dropdown'
          ? `options/dropdown/${f.referenceToDropdownId}`
          : `options/table/${f.referenceToId}`
      )
      .then(({ data }) => setOptions(data))
  }, [])

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
      required={f.required}
      sx={{
        '*::-webkit-datetime-edit': {
          color: empty ? 'transparent' : '#000',
        },
        '*:focus::-webkit-datetime-edit': { color: '#000' },
      }}
      onChange={(e) => {
        const data = e.target.value
        setEmpty(data == '')
        handleChange(f.name, new Date(data))
      }}
    />
  )
}

const Field = ({ f, handleChange }) => (
  <TextField
    fullWidth
    label={f.displayName}
    type={f.type}
    required={f.required}
    onChange={(e) => {
      let data = e.target.value
      if (f.type == 'number')
        data = data != '' ? +data : null //because +'' makes 0
      else data = data.trim()
      handleChange(f.name, data)
    }}
  />
)

const CheckBoxField = ({ f, handleChange }) => {
  useEffect(() => {
    handleChange(f.name, false)
  }, [])

  return (
    <FormControlLabel
      control={<Checkbox onChange={(_, v) => handleChange(f.name, v)} />}
      label={f.displayName}
    />
  )
}

const FormField = (p) => {
  const Input = (() => {
    switch (p.f.type) {
      case 'reference':
      case 'dropdown':
        return ReferenceField
      case 'date':
        return DateField
      case 'bool':
        return CheckBoxField
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
