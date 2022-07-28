import { makeAutoObservable } from 'mobx'

class DropdownDialog {
  opened = false
  dropdown
  onClose

  constructor() {
    makeAutoObservable(this)
  }

  open = (dropdown, onSubmit) => {
    this.onClose = onSubmit
    this.dropdown = dropdown
    this.opened = true
  }

  close = () => {
    this.onClose()
    this.opened = false
  }
}

export default new DropdownDialog()
