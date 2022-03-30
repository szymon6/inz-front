import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useParams } from 'react-router-dom'

const Table = () => {
  const { tableName } = useParams()
  //TODO - zarówno nazwy kolumn, i wartości z supabase, na koniec zrobić też branie typów(chyba jakiś mapping potrzebny)
  const columns = [
    {
      field: 'mark',
      headerName: 'Mark',

      editable: true,
    },
    {
      field: 'year',
      headerName: 'Year',
      type: 'number',

      editable: true,
    },
    {
      field: 'color',
      headerName: 'Color',
      editable: true,
    },
  ]

  const rows = [
    { id: 1, mark: 'Porsche', year: 2000, color: 'blue' },
    { id: 2, mark: 'BMW', year: 2010, color: 'red' },
    { id: 3, mark: 'Mercedes', year: 1990, color: 'green' },
    { id: 4, mark: 'Audi', year: 2020, color: 'yellow' },
  ]

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
