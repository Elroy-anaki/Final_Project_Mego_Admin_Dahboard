import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import SignIn from './forms/Auth/SignIn/SignIn'
import Home from "./pages/Home/Home";
import SideBar from "./pages/SideBar/SideBar";
import { useContext } from "react";
import { AuthContext } from './Contexts/AuthContext';

function Root({ isAuth }) {
  return (
    <>
      {isAuth && <SideBar />}
      <Outlet />
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
        <Route element={!isAuth ? <Outlet /> : <Navigate to={"/home"} /> }>
          <Route index element={<SignIn />} />
        </Route>


        {/* Private Routes */}
        <Route path="/home" element={<Home />} />
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
