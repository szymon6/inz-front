import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import RecordPage from './pages/Dashboard/RecordPage'
import TablePage from './pages/Dashboard/TablePage'
import FileUploadPage from './pages/FileUploadPage'
import LoginPage from './pages/LoginPage'
import UserStore from './stores/UserStore'

function App() {
  useEffect(() => {
    UserStore.fetch()
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Navigate to="table/employee" />} />
          <Route path="table/:tableName" element={<TablePage />} />
          <Route path="table/:tableName/new" element={<RecordPage isNew />} />
          <Route path="table/:tableName/:id" element={<RecordPage />} />
          <Route path="file/upload" element={<FileUploadPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
