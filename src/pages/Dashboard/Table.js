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
    const { data: tableInfo, error } = await api.get(`info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    //column info
    const mappedColumns = await Promise.all(
      tableInfo.columns.map(async (c) => {
        let options
        if (c.type === 'reference') {
          const { data } = await api.get(`info/options/${c.referenceToId}`)
          options = data
          c.type = 'singleSelect'
        }

        return {
          field: c.name,
          headerName: c.displayName,
          editable: true,
          width: 150,
          ...(c.type && { type: c.type }),
          ...(c.type === 'singleSelect' && {
            //options for dropdown
            valueOptions: options,

            //map value(id) to label - for every cell
            valueGetter: ({ value }) =>
              options.find((o) => o.value === value).label,
          }),
        }
      })
    )
    setMappedColumns(mappedColumns)

    // Fetch rowss
    let { data: rows } = await api.get(`table/${tableName}`)
    setRows(rows)
  }

  async function handleCellEditCommit(e) {
    await api.put(`table/${tableName}/${e.id}`, { [e.field]: e.value })
  }

  //TODO przetestowanie czy store dobrze pobiera dane
  //zamenienie wszytskiego co trzeba na store (pamiętać o opakowaniu w observer)

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
        <IconButton color="primary">
          <DeleteIcon />
        </IconButton>
      )}
    </>
  )
}

export default Table
