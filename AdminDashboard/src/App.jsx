import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";


import SignIn from './forms/Auth/SignIn/SignIn'
import SideBar from "./pages/SideBar/SideBar";
import { useContext } from "react";
import EmployeesSection from "./components/tables/EmployeesSection/EmployeesSection";
import OrdersSections from "./components/tables/ordersSection/OrdersSections";
import MealsSection from "./components/tables/MealsSection/MealsSection";
import UsersSection from "./components/tables/UsersSections/UsersSection";
import ResetPassword from "./forms/Auth/ResetPassword/ResetPassword";
import { AuthContext } from './Contexts/AuthContext';
import ForgotPassword from "./forms/Auth/ForgotPassword";


function Root({ isAuth }) {
  return (
    <>
      <div className="flex w-11/12 mx-auto">
        
          {isAuth && <div className="w-1/5"><SideBar />   </div>}

     
        {/* <div className="w-4/5"> */}

          <Outlet />
        {/* </div> */}

      </div>
    </>
  );
}


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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>


        {/* Private Routes */}
        <Route path="/dashboard" element={!isAuth ? <Navigate to={'/'}/> : <Outlet/>}>
        <Route path="employees" element={<EmployeesSection />} />
        <Route path="orders" element={<OrdersSections />} />
        <Route path="meals" element={<MealsSection />} />
        <Route path="users" element={<UsersSection />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App
