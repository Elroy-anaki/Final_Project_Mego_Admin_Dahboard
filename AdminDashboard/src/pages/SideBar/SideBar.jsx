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
  const {employee,singOut} = useContext(AuthContext);

  return (
    <div>
      {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button> */}

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full  px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gradient-to-b from-sky-900 via-sky-700 to-sky-900">
          <ul className="space-y-2 font-medium flex flex-col">
            <li className='border-b-2 border-b-white'>
              <Link to="/sign-in" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                <span><CgProfile size={20} /></span>
                <span className="ms-3 text-lg ">Hi, {employee?.employeeName}</span>
              </Link>
            </li>
            <li>

            </li>
            {employee?.premission === 'admin' ? <li>
              <Link to={'/dashboard/employees'} className="flex items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                
                <span><GrUserWorker size={20} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap ">Employees</span>
              </Link>
            </li> : null}
            
            <li>
              <Link to={'/dashboard/orders'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                <span><MdAttachMoney size={22} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </Link>
            </li>
            {employee?.premission === 'admin' ?<li>
              <Link to={'/dashboard/meals'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                <span><GiMeal size={20} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap">Meals</span>
              </Link>
              </li> : null}
              {employee?.premission === 'admin' ?<li>
              <Link to={'/dashboard/users'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span><FaRegUser size={20} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
              </li> : null}
            <li>
              <Link to={'/dashboard/profile'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span><CgProfile size={20} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li >
              <Link onClick={singOut} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className='text-red-600'><GoSignOut size={20} /></span>
                <span className="flex-1 ms-3 whitespace-nowrap text-red-600">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>


    </div>
  )
}

export default SideBar
