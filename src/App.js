import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Record from './pages/Dashboard/Record'
import Table from './pages/Dashboard/Table'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Navigate to="table/employee" />}/>
            <Route path="table/:tableName" element={<Table />} />
            <Route path="table/:tableName/new" element={<Record new />} />
            <Route path="table/:tableName/:id" element={<Record />} />
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
