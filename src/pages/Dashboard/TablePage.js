import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../supabase'

const TablePage = () => {
  const { tableName } = useParams()

  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])

  const [error, setError] = useState('')

  async function fetch() {
    let { data: rows, error } = await supabase.from(tableName).select('*')

    //If table was not found
    if (error) {
      setError(error)
      return
    }
    console.log(rows)
    setRows(rows)

    let { data: columns } = await supabase
      .from('columns')
      .select('*, tables!inner(*)')
      .eq('tables.name', tableName)

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
  useEffect(() => {
    fetch()
  }, [tableName])

  if (error !== '') return <div>table not found</div>

  return (
    <div>
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
        />
      </div>
    </div>
  )
}

export default TablePage
