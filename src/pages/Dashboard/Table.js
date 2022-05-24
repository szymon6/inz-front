import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'

const Table = () => {
  const { tableName } = useParams()

  const [tableDisplayName, setTableDisplayName] = useState('')
  const [rows, setRows] = useState([])
  const [mappedColumns, setMappedColumns] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  const navigate = useNavigate()

  async function fetch() {
    //Fetch table info

    //display name
    const { data: tableInfo, error } = await api.get(`table-info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    const mappedColumns = await Promise.all(
      tableInfo.columns.map(async (c) => {
        const boolColumn = {
          type: 'boolean',
        }

        const dateColumn = {
          type: 'date',
          valueFormatter: ({ value }) =>
            value && new Date(value).toLocaleDateString('en-GB'),
        }

        const dropdownColumn = async (c) => {
          const { data: options } = await api.get(
            c.type == 'dropdown'
              ? `options/dropdown/${c.referenceToDropdownId}`
              : `options/table/${c.referenceToId}`
          )

          return {
            type: 'singleSelect',
            valueFormatter: ({ value }) =>
              value && new Date(value).toLocaleDateString('en-GB'),

            //options for dropdown
            valueOptions: options,

            //map values(ids) to label for every cell
            valueFormatter: ({ value }) =>
              value && options.find((o) => o.value === value).label,
          }
        }

        const column = await (async () => {
          switch (c.type) {
            case 'date':
              return dateColumn
            case 'bool':
              return boolColumn
            case 'reference':
            case 'dropdown':
              return await dropdownColumn(c) //todo reference
            default:
              return null
          }
        })()

        return {
          field: c.name,
          headerName: c.displayName,
          editable: true,
          width: 150,
          ...column,
        }
      })
    )
    setMappedColumns(mappedColumns)

    // Fetch rowss
    let { data: rows } = await api.get(`table/${tableName}`)
    setRows(rows)
  }

  function handleCellEditCommit(e) {
    api.put(`table/${tableName}/${e.id}`, { [e.field]: e.value })
  }

  async function handleDelete() {
    for await (const id of selectedRows) {
      await api.delete(`table/${tableName}/${id}`)
    }
    fetch()
  }

  useEffect(() => {
    setSelectedRows([])
    setMappedColumns([])
    setRows([])
    fetch()
  }, [tableName])

  if (notFound) return <div>Table not found</div>

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" color="initial">
          {tableDisplayName}
        </Typography>
        <IconButton color="primary" onClick={() => navigate('new')}>
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </header>

      <DataGrid
        sx={{ height: '75vh' }}
        rows={rows}
        columns={mappedColumns}
        loading={rows.length === 0 || mappedColumns.length === 0}
        rowHeight={40}
        pageSize={100}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={handleCellEditCommit}
        selectionModel={selectedRows}
        onSelectionModelChange={(ids) => setSelectedRows(ids)}
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
