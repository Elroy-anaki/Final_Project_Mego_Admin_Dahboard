import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import axios from 'axios';
const queryClient = new QueryClient()

import AuthProvider from './Contexts/AuthContext.jsx'

import EmployeeModal from './components/tables/EmployeesSection/Modal/EmployeeModal'
import MealModal from './components/tables/MealsSection/Modal/MealModal.jsx'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToastContainer/>
      <EmployeeModal/>
      <MealModal/>
      <App />
    </AuthProvider>
    </QueryClientProvider>
);

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;