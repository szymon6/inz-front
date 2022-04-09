import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../supabase'
const TablePage = () => {
  const { tableName } = useParams()

  const [tableDisplayName, setTableDisplayName] = useState('')
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  async function fetch() {
    //Fetch table display name
    let { data: table } = await supabase
      .from('tables')
      .select('display_name')
      .eq('name', tableName)

    //If table was not found
    if (table.length === 0) {
      console.log(111)
      setNotFound(true)
      return
    }

    setTableDisplayName(table[0].display_name)

    //Fetch rows
    let { data: rows } = await supabase.from(tableName).select('*').order('id')

    console.log(rows)
    setRows(rows)

    //Fetch columns
    let { data: columns } = await supabase
      .from('columns')
      .select('*, tables!inner(*)')
      .eq('tables.name', tableName)
      .order('id')

    let mappedColumns = columns.map((c) => {
      return {
        field: c.name,
        headerName: c.display_name,
        editable: true,
        width: 150,
        ...(c.type != null && { type: c.type }),
      }
    })
    setColumns(mappedColumns)
  }

  async function handleCellEditCommit(e) {
    console.log(e)
    await supabase
      .from(tableName)
      .update({ [e.field]: e.value })
      .eq('id', e.id)
  }

  useEffect(() => {
    fetch()
    setSelectedRows([])
  }, [tableName])

  if (notFound) return <div>table not found</div>

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
        <IconButton color="primary">
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </header>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={rows.length === 0}
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

export default TablePage
