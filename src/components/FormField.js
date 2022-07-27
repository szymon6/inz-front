import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api'
import {
  EditDropdownButton,
  OpenRecordButton,
  OpenTableButton,
} from './RecordButtons'

const ReferenceField = ({ f, handleChange, data }) => {
  const [options, setOptions] = useState([])

  const fetch = () => {
    api
      .get(
        f.type == 'dropdown'
          ? `options/dropdown/${f.referenceToDropdownId}`
          : `options/table/${f.referenceToId}`
      )
      .then(({ data }) => setOptions(data))
  }

  useEffect(() => {
    fetch()
  }, [])

  if (!options.length) return null
  return (
    <Box sx={{ position: 'relative' }}>
      <Autocomplete
        fullWidth
        defaultValue={options.find((o) => o.value == data)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={f.displayName} required={f.required} />
        )}
        onChange={(_, value) => {
          handleChange(f.name, value != null ? value.value : null)
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '100%',
        }}
      >
        {f.type == 'reference' ? (
          <Box sx={{ display: 'flex' }}>
            {data && <OpenRecordButton table={f.referenceTo.name} id={data} />}
            <OpenTableButton table={f.referenceTo.name} />
          </Box>
        ) : (
          <EditDropdownButton dropdown={f.referenceToDropdown.name} />
        )}
      </Box>
    </Box>
  )
}

const DateField = ({ f, handleChange, data }) => {
  const [empty, setEmpty] = useState(!data)

  return (
    <TextField
      fullWidth
      defaultValue={data && data.slice(0, -14)}
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

const Field = ({ f, handleChange, data }) => (
  <TextField
    disabled={f.readonly}
    fullWidth
    defaultValue={data}
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

const CheckBoxField = ({ f, handleChange, data }) => {
  useEffect(() => {
    if (data == null) handleChange(f.name, false)
  }, [])

  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={data}
          onChange={(_, v) => handleChange(f.name, v)}
        />
      }
      label={f.displayName}
    />
  )
}

const FieldContext = React.createContext()
export const useFieldContext = () => useContext(FieldContext)

const FormField = (p) => {
  const [reload, setReload] = useState(false)

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

  useEffect(() => {
    setReload(false)
  }, [reload])

  return (
    !reload && (
      <Box my={2}>
        <FieldContext.Provider value={{ reload: () => setReload(true) }}>
          <Input {...p} />
        </FieldContext.Provider>
      </Box>
    )
  )
}

export default FormField
