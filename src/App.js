import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Record from './pages/Dashboard/Record'
import TablePage from './pages/Dashboard/TablePage'
import FileUpload from './pages/FileUpload'
import LoginPage from './pages/LoginPage'
import UserStore from './store/UserStore'

function App() {
  useEffect(() => {
    UserStore.fetch()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Navigate to="table/employee" />} />
            <Route path="table/:tableName" element={<TablePage />} />
            <Route path="table/:tableName/new" element={<Record isNew />} />
            <Route path="table/:tableName/:id" element={<Record />} />
            <Route path="file/upload" element={<FileUpload />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

//przykładowe linki

// .com/Dashboard/Table/JakasTabela
//// .com/Dashboard/Table/JakasTabela/1
//.com/Login
