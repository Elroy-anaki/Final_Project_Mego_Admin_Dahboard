import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Contexts/AuthContext.jsx'
import AddEmployee from './modals/employeeModal/addEmployee.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <AddEmployee/>
      <App />
    </AuthProvider>

)