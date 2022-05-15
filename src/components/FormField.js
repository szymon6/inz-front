import { Autocomplete, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = ({ f, register, setValue }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    api
      .get(`options/table/${f.referenceToId}`)
      .then(({ data }) => setOptions(data))
  }, [])

  return (
    <Autocomplete
      fullWidth
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={f.displayName} />}
      {...register}
      onChange={(_, v) => setValue(f.name, v.value)}
    />
  )
}

const DropdownField = ({ f, register, setValue }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    api
      .get(`options/dropdown/${f.referenceToDropdownId}`)
      .then(({ data }) => setOptions(data))
  }, [])

  return (
    <Autocomplete
      fullWidth
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={f.displayName} />}
      {...register}
      onChange={(_, v) => setValue(f.name, v.value)}
    />
  )
}

const Field = ({ f, register }) => (
  <TextField
    fullWidth
    label={f.displayName}
    required
    type={f.type}
    {...register}
  />
)

const FormField = (p) => {
  const { f } = p

  return (
    <Box my={2}>
      {(() => {
        switch (f.type) {
          case 'reference':
            return <ReferenceField {...p} />
          case 'dropdown':
            return <DropdownField {...p} />
          default:
            return <Field {...p} />
        }
      })()}
    </Box>
  )
}

export default FormField
