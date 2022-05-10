import { MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import api from '../api'

const ReferenceField = forwardRef(({ f, ...rest }, ref) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    api
      .get(`info/options/${f.referenceToId}`)
      .then(({ data }) => setOptions(data))
  }, [])

  const optionList = options.map((o) => (
    <MenuItem key={o.value} value={o.value}>
      {o.label}
    </MenuItem>
  ))

  return (
    <TextField
      required
      select
      fullWidth
      label={f.displayName}
      defaultValue=""
      ref={ref}
      {...rest}
    >
      {optionList}
    </TextField>
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
