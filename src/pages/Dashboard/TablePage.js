import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
const TablePage = () => {
  const { tableName } = useParams()

  const [tableDisplayName, setTableDisplayName] = useState('')
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  async function fetch() {
    //Fetch table info

    //display name
    const { data: tableInfo, error } = await api.get(`info/${tableName}`)
    if (error) return setNotFound(true)
    setTableDisplayName(tableInfo.displayName)

    console.log(tableInfo.columns6)

    //column info
    let mappedColumns = await Promise.all(
      tableInfo.columns.map(async (c) => {
        let options
        if (c.type === 'singleSelect') {
          const { data, error } = await api.get(
            `info/options/${c.referenceToId}`
          )
          options = data
        }

        return {
          field: c.name,
          headerName: c.displayName,
          editable: true,
          width: 150,
          ...(c.type && { type: c.type }),
          ...(c.type === 'singleSelect' && {
            valueOptions: options,
            valueGetter: ({ value }) =>
              options.find((o) => o.value == value).label,
          }),
        }
      })
    )
    setColumns(mappedColumns)

    // Fetch rowss
    let { data: rows } = await api.get(`table/${tableName}`)
    console.log(rows)

    // rows.forEach((r) => {
    //   r.ownerId = 'Janusz'
    // })

    console.log(rows)

    setRows(rows)

    //TODO: reference
  }

  async function handleCellEditCommit(e) {
    console.log(e)
    /*  await supabase
      .from(tableName)
      .update({ [e.field]: e.value })
      .eq('id', e.id)*/
  }

  useEffect(() => {
    fetch()
    setSelectedRows([])
    setColumns([])
    setRows([])
  }, [tableName])

  if (notFound) return <div>Table not found</div>

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
