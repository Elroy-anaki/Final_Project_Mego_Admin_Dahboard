import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";


import EmployeeModal from './components/tables/EmployeesSection/Modal/EmployeeModal';
import MealModal from './components/tables/MealsSection/Modal/MealModal.jsx';


import SignIn from './forms/Auth/SignIn/SignIn'
import SideBar from "./pages/SideBar/SideBar";
import { useContext } from "react";
import EmployeesSection from "./components/tables/EmployeesSection/EmployeesSection";
import OrdersSection from "./components/tables/ordersSection/OrdersSection";
import MealsSection from "./components/tables/MealsSection/MealsSection";
import UsersSection from "./components/tables/UsersSections/UsersSection";
import ProfileSection from "./components/tables/profileSection/ProfileSection.jsx";
import ResetPassword from "./forms/Auth/ResetPassword/ResetPassword";
import { AuthContext } from './Contexts/AuthContext';
import ForgotPassword from "./forms/Auth/ForgotPassword/ForgotPassword";
import MealDetailsModal from "./components/tables/MealsSection/Modal/MealDetailsModal.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MealsForOrderModal from "./components/tables/ordersSection/TablesOrders/Modal/MealsForOrderModal.jsx";


function Root({ isAuth }) {
  return (
    <>
      <div className="flex w-11/12 mx-auto">
          {isAuth && <div className="w-1/5"><SideBar />   </div>}
          <Outlet />
      </div>

        {/* Modals */}
        <MealModal/>
        <MealsForOrderModal/>
        <EmployeeModal />
        <MealDetailsModal/>

    </>
  );
}


function App() {
  const { isAuth, employee  } = useContext(AuthContext);
  console.log(isAuth);
  console.log(employee);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />} errorElement={<ErrorPage />}>

        {/* Public Routes */}
        <Route element={!isAuth ? <Outlet /> : <Navigate to={"/dashboard/orders"} />} >
          <Route index element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        


        {/* Private Routes */}
        <Route path="/dashboard" element={!isAuth ? <Navigate to={'/'}/> : <Outlet/>}>
        <Route path="employees" element={employee?.premission === 'admin'? <EmployeesSection />: <Navigate to={'/dashboard/meals'}/>} />
        <Route path="orders" element={<OrdersSection />} />
        <Route path="meals" element={<MealsSection />} />
        <Route path="users" element={<UsersSection />} />
        <Route path="profile" element={<ProfileSection key={"profile"} employee={employee} />} />
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
