import React from 'react';
import { useNavigate, useSearchParams } from "react-router";
import axios from 'axios';

//TODO check how to update the user for the dashboard

function ResetPassword() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { newPassword } = e.target;
    const userId = queryParams.get("userId")
    const forgotPasswordId = queryParams.get("forgotPasswordId")
    try {
      const { data } = await axios.post(`http://localhost:3000/auth/reset-password?userId=${userId}&forgotPasswordId=${forgotPasswordId}`, {  password: newPassword.value, premission: 'employee' })
      data.success && navigate('/sign-in');

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-10 py-10 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md   sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-700">
            Reset Password
          </h2>
          <form
            onSubmit={handleSubmit}

            className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            
            <div>
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">New Password</label>
              <input type="text" name="password" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-800 to-blue-600  ">

              <button type="submit" className="w-full text-white text-md">Reset passwod</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
