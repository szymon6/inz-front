import { makeAutoObservable } from "mobx"

class TableStore {
  tableDisplayName = ""
  rows = []
  columns = []
  notFound = false
  loading = false
  selectedRows = []

  constructor() {
    makeAutoObservable(this)
  }

  foo = () => {}

  fetch() {}
}

export default new TableStore()
