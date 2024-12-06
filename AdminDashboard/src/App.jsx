import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import SignIn from './forms/Auth/SignIn/SignIn'
import SideBar from "./pages/SideBar/SideBar";
import { useContext } from "react";
import { AuthContext } from './Contexts/AuthContext';
import EmployeesSection from "./components/tables/EmployeesTable/EmployeesSection";


function Root({ isAuth }) {
  return (
    <>
      <div className="flex w-11/12 mx-auto">
        <div className="w-1/5">
          {isAuth && <SideBar />}

        </div>
        <div className="w-4/5">

          <Outlet />
        </div>

      </div>
    </>
  );
}

const queryClient = new QueryClient()

function App() {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>

        {/* Public Routes */}
        <Route element={!isAuth ? <Outlet /> : <Navigate to={"/dashboard/employees"} />}>
          <Route index element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>


        {/* Private Routes */}
        <Route path="/dashboard" element={!isAuth ? <Navigate to={'/'}/> : <Outlet/>}>
        <Route path="employees" element={<EmployeesSection />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App
