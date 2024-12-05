import React, { useContext } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
// import sigUpSchema from "../../../../schemas/signUp.schema";
import axios from "axios";
import { AuthContext } from '../../../Contexts/AuthContext'



const initialUserValues = {
  userEmail: "",
  userPassword: "",
};

function SignUp() {
  const { setIsAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const sendToServer = async (newEmployeeData) => {
    try {
        const { data } = await axios.post(`http://localhost:3000/users/log-in`, newEmployeeData, {withCredentials: true})
        console.log(data)
        setIsAuth(true)
        
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-start mx-auto rounded-lg my-10 ">
      <div className="grid grid- md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
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
          initialValues={initialUserValues}
          // validationSchema={sigUpSchema}
          onSubmit={ async (values, actions) => {
            console.log(values);
            alert("yes")

            await sendToServer(values)
            // actions.resetForm();
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
              <div className="mb-6">
                <h3 className="text-gray-800 text-2xl font-bold">
                  Hi Employee, Sign In Please 😀
                </h3>
              </div>

              <div className="space-y-6">
                
                <Input
                  // error={errors.email}
                  label="Email"
                  name="userEmail"
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
                  name="userPassword"
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
                  className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-white font-semibold  bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 hover:bg-gray-800 focus:outline-none"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                Forgot Your Password?
                <Link
                  to={"/sign-in"}
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

export default SignUp;
