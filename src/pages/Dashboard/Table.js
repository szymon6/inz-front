import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../supabase'

const Table = () => {
  const { tableName } = useParams()

  const [data, setData] = useState('')
  const [error, setError] = useState('')

  async function fetch() {
    let { data, error } = await supabase.from(tableName).select('*')

    if (error) {
      console.log('hehe1')
      setError(error)
      return
    }

    console.log(data)
    setData(data)
  }
  useEffect(() => {
    fetch()
  }, [])

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

      editable: true,
    },
    {
      field: 'color',
      headerName: 'Color',
      editable: true,
    },
  ]

  // const rows = [
  //   { id: 1, mark: 'Porsche', year: 2000, color: 'blue' },
  //   { id: 2, mark: 'BMW', year: 2010, color: 'red' },
  //   { id: 3, mark: 'Mercedes', year: 1990, color: 'green' },
  //   { id: 4, mark: 'Audi', year: 2020, color: 'yellow' },
  // ]

  if (error !== '') {
    console.log('render errora')
    return <div>not found</div>
  }

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
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
