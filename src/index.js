import { CssBaseline } from '@mui/material'
import { configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

configure({
  enforceActions: 'never',
})

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
)
