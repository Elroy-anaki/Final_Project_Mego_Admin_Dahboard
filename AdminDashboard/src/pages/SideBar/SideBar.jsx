import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// React Icons
import { GiMeal } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

// Global Context
import {AuthContext} from '../../Contexts/AuthContext'

function SideBar() {
  const {employee, singOut} = useContext(AuthContext);

  return (
    <div>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-4 py-6 overflow-y-auto bg-gradient-to-b from-blue-900 via-blue-700 to-blue-900 text-white shadow-lg">

          <ul className="space-y-4 font-medium flex flex-col">
            <li className='border-b-2 border-b-white pb-2'>
              <Link to="/sign-in" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <CgProfile size={24} />
                <span className="ml-3 text-lg">Hi, {employee.employeeName}</span>
              </Link>
            </li>
            {employee.premission === 'admin' && (
              <li>
                <Link to={'/dashboard/employees'} className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                  <GrUserWorker size={24} />
                  <span className="ml-3">Employees</span>
                </Link>
              </li>
            )}
            <li>
              <Link to={'/dashboard/orders'} className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <MdAttachMoney size={24} />
                <span className="ml-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/meals'} className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <GiMeal size={24} />
                <span className="ml-3">Meals</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/users'} className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <FaRegUser size={24} />
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/profile'} className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <CgProfile size={24} />
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <button onClick={singOut} className="flex items-center p-2 rounded-lg hover:bg-red-800 transition-colors duration-200">
                <GoSignOut size={24} className='text-red-600' />
                <span className="ml-3 text-red-600">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default SideBar
