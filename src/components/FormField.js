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
  const [val, setVal] = useState(null)

  useEffect(() => {
    api
      .get(`options/dropdown/${f.referenceToDropdownId}`)
      .then(({ data }) => setOptions(data))
  }, [])

  return (
    <Autocomplete
      fullWidth
      options={options}
      value={val}
      renderInput={(params) => <TextField {...params} label={f.displayName} />}
      {...register}
      onChange={(_, v) => {
        //todo tu też wywalić ten argument
        if (v) {
          console.log(v.value) //setValue(f.name, v.value)
          setVal(v)
        }
      }}
      onInputChange={(e, v, reason) => {
        //todo jak wywalić te nieużywane argumenty
        if (reason === 'reset') setVal(null)
      }}
    />
  )
}
//TODO sprawić żeby Autocoplete dało się clearować
//potem zrobić conditional manditory dla Autocopmlete i TextField

const Field = ({ f, register }) => (
  <TextField fullWidth label={f.displayName} type={f.type} {...register} />
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
