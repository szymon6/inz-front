import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import useMapping from '../../hooks/useMapping'

const Table = () => {
  const { tableName } = useParams()

  const [tableDisplayName, setTableDisplayName] = useState('')
  const [rows, setRows] = useState([])
  const [mappedColumns, setMappedColumns] = useState([])

  const [notFound, setNotFound] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  const navigate = useNavigate()
  const mapping = useMapping()

  async function fetch() {
    //Fetch table info

    //display name
    const { data: tableInfo, error } = await api.get(`info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    //column info
    const columns = tableInfo.columns
    const mappedColumns = await mapping.mapColumns(columns)
    setMappedColumns(mappedColumns)

    // Fetch rowss
    let { data: rows } = await api.get(`table/${tableName}`)
    console.log(rows)
    setRows(rows)
  }

  async function handleCellEditCommit(e) {
    await api.put(`table/${tableName}/${e.id}`, { [e.field]: e.value })
  }

  useEffect(() => {
    setSelectedRows([])
    setMappedColumns([])
    setRows([])
    fetch()
  }, [tableName])

  if (notFound) return <div>Table not found</div>
  //`../table/${tableName}`
  return (
    <div>
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={mappedColumns}
          loading={rows.length === 0 || mappedColumns.length == 0}
          rowHeight={40}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onCellEditCommit={handleCellEditCommit}
          selectionModel={selectedRows}
          onSelectionModelChange={(ids) => setSelectedRows(ids)}
        />
      </div>
      {selectedRows.length !== 0 && (
        <IconButton color="primary">
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  )
}

export default Table
