import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Contexts/AuthContext.jsx'
import EmployeesTable from './components/tables/EmployeesTable/EmployeesTable.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>

)