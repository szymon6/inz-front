import { makeAutoObservable } from "mobx"

class EditDropdownDialogStore {
  opened = false
  dropdown
  onClose

  constructor() {
    makeAutoObservable(this)
  }

  open = (dropdown, onClose) => {
    this.onClose = onClose
    this.dropdown = dropdown
    this.opened = true
  }

  close = () => {
    this.onClose()
    this.opened = false
  }
}

export default new EditDropdownDialogStore()
