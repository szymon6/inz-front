import api from 'api'
import { makeAutoObservable } from 'mobx'

class UserStore {
  val = null
  loading = true

  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    const { data, error } = await api.get('auth/user')
    if (!error) this.val = data
    this.loading = false
  }

  async login(username, password, remember) {
    const { data, error } = await api.post('auth/login', { username, password })
    if (error) return false

    this.val = data.user

    if (remember) localStorage.setItem('token', data.token)
    else sessionStorage.setItem('token', data.token)

    return true
  }

  async logout() {
    this.val = null
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

  isLoggedIn() {
    return this.val != null
  }
}

export default new UserStore()
