import { MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = forwardRef(({ f, ...rest }, ref) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  async function fetch() {
    const { data } = await api.get(`info/options/${f.referenceToId}`)
    setOptions(data)
  }

  const optionList = options.map((o) => (
    <MenuItem key={o.value} value={o.value}>
      {o.label}
    </MenuItem>
  ))

  return (
    <Select fullWidth defaultValue={1} ref={ref} {...rest}>
      {optionList.length ? optionList : <MenuItem value={1}></MenuItem>}
    </Select>
  )
})

const FormField = forwardRef(({ f, ...rest }, ref) => {
  const Field = () => (
    <TextField
      fullWidth
      label={f.displayName}
      required
      type={f.type}
      ref={ref}
      {...rest}
    />
  )

  return (
    <Box my={2}>
      {f.type !== 'reference' ? (
        <Field />
      ) : (
        <ReferenceField f={f} ref={ref} {...rest} />
      )}
    </Box>
  )
})
//TODO:  dodawanie nowego rekordu, obowiązkowe pola
//TODO: edycja
export default FormField
