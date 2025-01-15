import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App.jsx';

// Import QueryClients
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
const queryClient = new QueryClient();

// Import Providers
import AuthProvider from './Contexts/AuthContext.jsx';

// Import UI
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <ToastContainer />
        <App />
    </AuthProvider>
  </QueryClientProvider>
);

// Define the default in axios
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;