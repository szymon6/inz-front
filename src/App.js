import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TablePage from './pages/Dashboard/TablePage'
import Test from './pages/Dashboard/Test'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="table/:tableName" element={<TablePage />} />
            <Route path="test" element={<Test />} />
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
