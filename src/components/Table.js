import AddBoxIcon from "@mui/icons-material/AddBox"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, Typography } from "@mui/material"

import { DataGrid } from "@mui/x-data-grid"
import api from "api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  boolColumn,
  dateColumn,
  numberColumn,
  referenceColumn,
  stringColumn,
} from "../utils/columns"

const Table = ({ name, dropdown, customURL }) => {
  const [tableDisplayName, setTableDisplayName] = useState("")
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  const navigate = useNavigate()

  async function fetch() {
    setLoading(true)
    //Fetch table info

    //display name

    const { data: tableInfo, error } = dropdown
      ? await api.get(`dropdown-info`)
      : await api.get(`table-info/${name}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    setColumns(
      await Promise.all(
        tableInfo.columns.map(async (c) => {
          const column = await (async () => {
            switch (c.type) {
              case "date":
                return dateColumn(c, name)
              case "bool":
                return boolColumn
              case "number":
              case "id":
                return numberColumn
              case "reference":
              case "dropdown":
                return await referenceColumn(c, name)
              case null:
                return stringColumn(c, name)
              default:
                return null
            }
          })()

          return {
            field: c.name,
            headerName: c.displayName,
            editable: !c.readonly,
            width: 200,
            ...column,
          }
        })
      )
    )

    // Fetch rowss
    let { data: rows } = customURL
      ? await api.get(customURL)
      : await api.get(`table/${name}`)

    if (rows) setRows(rows)

    setLoading(false)
  }

  function handleCellEditCommit(e) {
    if (e.value instanceof Date) {
      let date = new Date(e.value)
      date.setDate(date.getDate() + 1)
      e.value = date
    }
    api.patch(`table/${name}/${e.id}`, { [e.field]: e.value })
  }

  async function handleDelete() {
    let errors = false
    for await (const id of selectedRows) {
      const { error } = await api.delete(`table/${name}/${id}`)
      if (error) errors = true
    }
    if (errors) alert("Could not delete, check if records are not in use")
    fetch()
  }

  useEffect(() => {
    setTableDisplayName("")
    setSelectedRows([])
    setColumns([])
    setRows([])
    setNotFound(false)

    fetch()
  }, [name])

  if (notFound) return <div>Table not found</div>

  return (
    <>
      {!customURL && !dropdown && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" color="initial">
            {tableDisplayName}
          </Typography>
          <IconButton
            color="primary"
            onClick={() => navigate(`/table/${name}/new`)}
          >
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </header>
      )}

      <DataGrid
        sx={{ height: "75vh" }}
        rows={rows}
        columns={columns}
        rowHeight={40}
        pageSize={100}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={handleCellEditCommit}
        selectionModel={selectedRows}
        onSelectionModelChange={(ids) => setSelectedRows(ids)}
        loading={loading}
      />

      {selectedRows.length !== 0 && (
        <IconButton color="primary" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </>
  )
}

export default Table
