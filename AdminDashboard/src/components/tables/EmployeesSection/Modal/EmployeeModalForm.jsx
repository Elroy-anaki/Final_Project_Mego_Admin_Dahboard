import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "./Select";
import axios from "axios";

const validationSchema = Yup.object({
  employeeEmail: Yup.string().email("Invalid email address").required("must"),
  employeePassword: Yup.string()
    .min(5, "Must have at least 5 characters")
    .required("must"),
});

const initialValues = {
  employeeName: "",
  employeeEmail: "",
  employeePassword: "",
  premission: "",
};

function EmployeeModalForm() {

  const sendToServer = async (newEmployeeData) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/employees/add-employee`,
        newEmployeeData,
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        alert("yes");
        await sendToServer(values);
        actions.resetForm()
        document.getElementById('addEmployeeModal').close()
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <div className=" bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white  overflow-hidden">
            <div className="p-4">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">
                  Add New Employee
                </h1>
                <Form id="addEmployeeForm">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                      name="employeeName"
                      value={values.employeeName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.employeeName && errors.employeeName ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeeName}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="Email">
                      Email
                    </label>
                    <input
                      type="Email"
                      id="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Email"
                      name="employeeEmail"
                      value={values.employeeEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.employeeEmail && errors.employeeEmail ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeeEmail}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password"
                      name="employeePassword"
                      value={values.employeePassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.employeePassword && errors.employeePassword ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeePassword}
                      </div>
                    ) : null}
                  </div>
                  <div >
                    <Select onChange={handleChange} />

                    {touched.employeePremission && errors.employeePremission ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeePremission}
                      </div>
                    ) : null}
                  </div>
                  <div className="!mt-12">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-white font-semibold  bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 hover:bg-gray-800 focus:outline-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "inProccess..." : "Add Employee"}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default EmployeeModalForm