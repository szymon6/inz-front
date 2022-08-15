import { makeAutoObservable } from 'mobx'

class DialogStore {
  dialog = null

  constructor() {
    makeAutoObservable(this)
  }

  open = (dialog) => {
    this.dialog = dialog
  }

  close = () => {
    this.dialog = null
  }
}

export default new DialogStore()
