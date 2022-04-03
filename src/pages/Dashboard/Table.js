import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../supabase'

const Table = () => {
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

    setRows(rows)

    let { data: columns } = await supabase
      .from('columns')
      .select('*, tables!inner(*)')
      .eq('tables.name', 'cars')

    let mappedColumns = columns.map((c) => {
      return {
        field: c.name,
        headerName: c.display_name,
        editable: true,
      }
    })

    setColumns(mappedColumns)
  }
  useEffect(() => {
    fetch()
  }, [])

  if (error !== '') {
    console.log('render errora')
    return <div>not found</div>
  }

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  )
}

export default Table
