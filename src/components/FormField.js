import { MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Field = (f) => (
  <TextField fullWidth label={f.displayName} required type={f.type} />
)
//TODO branie z wiadomo czego
const ReferenceField = (f) => (
  <Select fullWidth defaultValue={1} label="Age">
    <MenuItem value={1}>Ten</MenuItem>
    <MenuItem value={2}>Twenty</MenuItem>
    <MenuItem value={3}>Thirty</MenuItem>
  </Select>
)

const FormField = ({ f }) => {
  return (
    <Box my={2}>
      {f.type !== 'reference' ? <Field /> : <ReferenceField />}
      <br />
    </Box>
  )
}

export default FormField
