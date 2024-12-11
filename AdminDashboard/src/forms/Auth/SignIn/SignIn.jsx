import React, { useContext } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
// import sigUpSchema from "../../../../schemas/signUp.schema";
import axios from "axios";
import { AuthContext } from '../../../Contexts/AuthContext'
import { notifySuccess } from "../../../lib/Toasts/Toasts";



const initialEmployeeValues = {
  employeeEmail: "",
  employeePassword: "",
};


function SignIn() {
  const { setIsAuth,setEmployee } = useContext(AuthContext)

  const sendToServer = async (newEmployeeData) => {
    try {
        const { data } = await axios.post(`http://localhost:3000/employees/sign-in`, newEmployeeData, {withCredentials: true})
        setEmployee(data.data)
        setIsAuth(true)
        console.log(data)
        notifySuccess(`Welcome Back, ${data.data.employeeName}`)
        
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center justify-center items mx-auto rounded-lg h-screen">
      <h1 className="absolute top-8 text-5xl">KitchenAI</h1>
      <div className="grid grid- md:grid-cols-3 items-center shadow-2xl rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-sky-950 to-sky-800 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-center text-3xl font-semibold">
              Welcome!
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 text-center text-base leading-relaxed">
              Welcome to our Sign In page, Enter your email and password!
            </p>
          </div>
          
        </div>
        <Formik
          initialValues={initialEmployeeValues}
          // validationSchema={sigUpSchema}
          onSubmit={ async (values, actions) => {
            console.log(values);
            await sendToServer(values)
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
            errors,
            touched,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 w-full py-6 px-6 sm:px-16"
            >
              <div className="mb-6 ">
                <h3 className="text-gray-800 text-2xl font-bold">
                  Hi Employee, Sign In Please 😀
                </h3>
              </div>

              <div className="space-y-6">
                
                <Input
                  // error={errors.email}
                  label="Email"
                  name="employeeEmail"
                  type="email"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  // error={errors.password}
                  label="Password"
                  name="employeePassword"
                  type="password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full bg-sky-900 text-white text-lg py-3 rounded-lg hover:bg-sky-800 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-md"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-6 text-center">
                Forgot Your Password?
                <Link
                  to={"/forgot-password"}
                  className="text-sky-600 font-semibold hover:underline ml-1"
                >
                  Reset Here
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignIn;
