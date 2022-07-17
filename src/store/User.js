import { makeAutoObservable } from 'mobx'
import api from '../api'

class User {
  val = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    const { data, error } = await api.get('auth/user')
    if (!error) this.val = data

    console.log(JSON.stringify(this.val))
  }

  async login(username, password, remember) {
    const { data, error } = await api.post('auth/login', { username, password })
    if (error) return false

    this.val = data.user

    console.log(JSON.stringify(this.val))

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

export default new User()