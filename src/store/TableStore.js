import { makeAutoObservable, runInAction } from 'mobx'
import api from '../api'

class TableStore {
  name = ''
  displayName = ''
  rows = []
  columns = []
  notFound = false

  constructor(name) {
    makeAutoObservable(this)
    this.name = name
    this.fetch()
  }

  async fetch() {
    const { data: tableInfo, error } = await api.get(`info/${this.name}`)
    if (error) {
      this.notFound = true
      return
    }

    let { data: rows } = await api.get(`table/${this.name}`)
    console.log({ tableInfo, rows })
    //kolumny i wiersze
    runInAction(() => {
      this.displayName = tableInfo.displayName
      this.columns = tableInfo.columns
      this.rows = rows
    })
  }
}

export default TableStore
