import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import api from "api"
import React, { useContext, useEffect, useState } from "react"
import {
  EditDropdownButton,
  OpenRecordButton,
  OpenTableButton,
} from "./RecordButtons"

const ReferenceField = ({ f, handleChange, data }) => {
  const [options, setOptions] = useState([])

  const fetch = () => {
    api
      .get(
        f.type == "dropdown"
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
    <Box sx={{ position: "relative" }}>
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
          position: "absolute",
          top: "20%",
          left: "100%",
        }}
      >
        {f.type == "reference" ? (
          <Box sx={{ display: "flex" }}>
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
  const [empty, setEmpty] = useState(true)
  const [checkBox, setCheckBox] = useState(f.required || data != null)
  const [defaultValue, setDefaultValue] = useState(null)

  useEffect(() => {
    if (checkBox) handleChange(f.name, new Date(0))
  }, [])

  if (defaultValue == null) {
    if (data && new Date(data).getTime() != 0) {
      setDefaultValue(data.slice(0, -14))
      if (empty) setEmpty(false)
    } else setDefaultValue("")
  }
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBox}
            onChange={(_, v) => {
              if (f.required) return
              setCheckBox(v)
              handleChange(f.name, v ? new Date(0) : null)
            }}
          />
        }
        label={f.displayName.replace("Date", "")}
      />
      <TextField
        fullWidth
        defaultValue={defaultValue}
        label={f.displayName}
        type="date"
        sx={{
          display: checkBox ? "block" : "none",
          "*::-webkit-datetime-edit": {
            color: empty ? "transparent" : "#000",
          },
          "*:focus::-webkit-datetime-edit": { color: "#000" },
        }}
        onChange={(e) => {
          let data = e.target.value
          setEmpty(data == "")
          if (data == "") data = 0

          handleChange(f.name, new Date(data))
        }}
      />
    </>
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
      if (f.type == "number")
        data = data != "" ? +data : null //because +'' makes 0
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
      case "reference":
      case "dropdown":
        return ReferenceField
      case "date":
        return DateField
      case "bool":
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
