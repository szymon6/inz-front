import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import TableStore from 'stores/TableStore'

const Table = observer(({ name, dropdown, customURL }) => {
  const navigate = useNavigate()
  const [store, setStore] = useState(new TableStore(name, dropdown, customURL))

  const {
    displayName,
    rows,
    columns,
    notFound,
    loading,
    selectedRows,
    handleCellEditCommit,
    setSelectedRows,
    handleDelete,
  } = toJS(store)

  useEffect(() => {
    setStore(new TableStore(name, dropdown, customURL))
  }, [name])

  if (notFound) return <div>Table not found</div>

  return (
    <>
      {!customURL && !dropdown && (
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" color="initial">
            {displayName}
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
        sx={{ height: '75vh' }}
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
})

export default Table
