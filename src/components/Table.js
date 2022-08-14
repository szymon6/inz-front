import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"

import AddBoxIcon from "@mui/icons-material/AddBox"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, Typography } from "@mui/material"

import { DataGrid } from "@mui/x-data-grid"
import api from "api"

const Table = observer(({ store }) => {
  const navigate = useNavigate()

  let {
    name,
    dropdown,
    customURL,
    displayName,
    rows,
    columns,
    notFound,
    loading,
    selectedRows,
  } = toJS(store)

  function handleCellEditCommit(e) {
    if (e.value instanceof Date) {
      let date = new Date(e.value)
      date.setDate(date.getDate() + 1)
      e.value = date
    }
    api.patch(`table/${name}/${e.id}`, { [e.field]: e.value })
  }

  async function handleDelete() {
    let errors = false
    for await (const id of selectedRows) {
      const { error } = await api.delete(`table/${name}/${id}`)
      if (error) errors = true
    }
    if (errors) alert("Could not delete, check if records are not in use")
    // fetch()
  }

  if (notFound) return <div>Table not found</div>

  return (
    <>
      {!customURL && !dropdown && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
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
        sx={{ height: "75vh" }}
        rows={rows}
        columns={columns}
        rowHeight={40}
        pageSize={100}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={handleCellEditCommit}
        selectionModel={selectedRows}
        // onSelectionModelChange={(ids) => setSelectedRows(ids)}
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
