import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Link as UnstyledLink, useNavigate } from 'react-router-dom'
import api from '../api'

const Link = styled(UnstyledLink)({
  color: 'black',
})

const Table = ({ name, dropdown, customURL }) => {
  const [tableDisplayName, setTableDisplayName] = useState('')
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  const navigate = useNavigate()

  async function fetch() {
    //Fetch table info

    //display name
    if (!dropdown) {
      const { data: tableInfo, error } = await api.get(`table-info/${name}`)
      if (error) return setNotFound(true)
      setTableDisplayName(tableInfo.displayName)

      setColumns(
        await Promise.all(
          tableInfo.columns.map(async (c) => {
            const referenceColumn = async (c) => {
              const { data: options } = await api.get(
                c.type == 'dropdown'
                  ? `options/dropdown/${c.referenceToDropdownId}`
                  : `options/table/${c.referenceToId}`
              )

              return {
                type: 'singleSelect',

                //options for dropdown
                valueOptions: options,

                //map values(ids) to label for every cell
                valueFormatter: ({ value }) =>
                  value && options.find((o) => o.value === value).label,

                //if its display value, change it to link
                ...(c.type != 'reference' &&
                  c.displayValue && {
                    renderCell: ({ value, id }) => (
                      <Link to={`/table/${name}/${id}`}>
                        {value && options.find((o) => o.value === value).label}
                      </Link>
                    ),
                  }),
                //the same, but foreign table
                ...(c.type == 'reference' && {
                  renderCell: ({ value }) => {
                    const option = options.find((o) => o.value === value)
                    return (
                      <Link to={`/table/${c.referenceTo.name}/${option.value}`}>
                        {value && option.label}
                      </Link>
                    )
                  },
                }),
              }
            }

            const dateColumn = {
              type: 'date',
              width: 120,
              valueFormatter: ({ value }) =>
                value && new Date(value).toLocaleDateString('en-GB'),

              ...(c.displayValue && {
                renderCell: ({ value, id }) => (
                  <Link to={`/table/${name}/${id}`}>
                    {new Date(value).toLocaleDateString('en-GB')}
                  </Link>
                ),
              }),
            }

            const stringColumn = {
              ...(c.displayValue && {
                renderCell: ({ value, id }) => (
                  <Link to={`/table/${name}/${id}`}>{value}</Link>
                ),
              }),
            }

            const boolColumn = {
              type: 'boolean',
              width: 100,
            }
            const numberColumn = {
              type: 'number',
              width: 100,
            }

            const column = await (async () => {
              switch (c.type) {
                case 'date':
                  return dateColumn
                case 'bool':
                  return boolColumn
                case 'number':
                case 'id':
                  return numberColumn
                case 'reference':
                case 'dropdown':
                  return await referenceColumn(c)
                case null:
                  return stringColumn
                default:
                  return null
              }
            })()

            return {
              field: c.name,
              headerName: c.displayName,
              editable: !c.readonly,
              width: 200,
              ...column,
            }
          })
        )
      )

      // Fetch rowss
      let { data: rows } = customURL
        ? await api.get(customURL)
        : await api.get(`table/${name}`)
      setRows(rows)
    } else {
      setColumns([
        {
          field: 'id',
          headerName: 'ID',
          editable: false,
          width: 100,
        },
        {
          field: 'value',
          headerName: 'VALUE',
          editable: true,
          width: 200,
        },
      ])
    }
  }

  function handleCellEditCommit(e) {
    api.put(`table/${name}/${e.id}`, { [e.field]: e.value })
  }

  async function handleDelete() {
    for await (const id of selectedRows) {
      await api.delete(`table/${name}/${id}`)
    }
    fetch()
  }

  useEffect(() => {
    setSelectedRows([])
    setColumns([])
    setRows([])
    setNotFound(false)
    fetch()
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
            {tableDisplayName}
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
      />

      {selectedRows.length !== 0 && (
        <IconButton color="primary" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </>
  )
}

export default Table
