import api from "api"
import { makeAutoObservable } from "mobx"
import {
  boolColumn,
  dateColumn,
  numberColumn,
  referenceColumn,
  stringColumn,
} from "utils/columns"

class TableStore {
  name = ""
  dropdown = false
  customURL = null
  displayName = ""
  rows = []
  columns = []
  notFound = false
  loading = false
  selectedRows = []

  constructor(name, dropdown, customURL) {
    this.name = name
    this.dropdown = dropdown
    this.customURL = customURL

    makeAutoObservable(this)
    this.fetch()
  }

  fetch = async () => {
    this.loading = true

    //display name
    const { data: tableInfo, error } = this.dropdown
      ? await api.get(`dropdown-info`)
      : await api.get(`table-info/${this.name}`)
    if (error) return (this.notFound = true)
    this.displayName = tableInfo.displayName

    this.columns = await Promise.all(
      tableInfo.columns.map(async (c) => {
        const column = await (async () => {
          switch (c.type) {
            case "date":
              return dateColumn(c, this.name)
            case "bool":
              return boolColumn
            case "number":
            case "id":
              return numberColumn
            case "reference":
            case "dropdown":
              return await referenceColumn(c, this.name)
            case null:
              return stringColumn(c, this.name)
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

    // Fetch rows
    let { data: rows } = this.customURL
      ? await api.get(this.customURL)
      : await api.get(`table/${this.name}`)

    this.rows = rows
    this.loading = false
  }
}

export default TableStore
