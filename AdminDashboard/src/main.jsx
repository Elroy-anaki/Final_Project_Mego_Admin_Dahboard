import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient()

import AuthProvider from './Contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </QueryClientProvider>


)