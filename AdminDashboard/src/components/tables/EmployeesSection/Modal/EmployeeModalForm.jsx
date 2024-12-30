import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "./Select";
import axios from "axios";
import { EmployeeContext } from "../../../../Contexts/EmployeeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient()

  const { employee, setEmployee } = useContext(EmployeeContext);
  const [employeeValues, setValues] = useState(initialValues)

  useEffect(() => {
    if (employee) {
      setValues({
        employeeName: employee.employeeName,
        employeeEmail: employee.employeeEmail,
        employeePassword: "***********",
        premission: employee.premission,
      })
    } else {setValues(initialValues)}
      console.log("values", employeeValues)
  }, [employee])

  const { mutate: addOrEditEmployee } = useMutation({
    mutationKey:['addOrEditEmployee'],
    mutationFn: async (employeeDetails) => {
      const { data } = await axios({
        method: employee ? "PUT" : "POST",
        data: employeeDetails,
        url: employee ? `/employees/edit-employee-by-id/${employee._id}` : '/employees/add-employee'
      })
      console.log(data)
      return data
    },
    onSuccess: async (data) =>{
      await queryClient.invalidateQueries({queryKey: ['getAllemployees']})
      console.log(data)

    }
  })

  return (
    <Formik
      initialValues={employeeValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, actions) => {
        addOrEditEmployee(values);
        actions.resetForm()
        document.getElementById('addEmployeeModal').close();
        setEmployee(null)
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <div className=" bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white  overflow-hidden">
            <div className="p-4">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">
                  {employee ? "Edit Employee" : "Add New Employee"}
                </h1>
                <Form id="addEmployeeForm" className="space-y-4">
                  <div>
                    <label className="block text-gray-700 " htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                      name="employeeName"
                      value={values?.employeeName}
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
                    <label className="block text-gray-700 " htmlFor="Email">
                      Email
                    </label>
                    <input
                      type="Email"
                      id="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Email"
                      name="employeeEmail"
                      value={values?.employeeEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={employee ? true : false}
                    />
                    {touched.employeeEmail && errors.employeeEmail ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeeEmail}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 "
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
                      value={values?.employeePassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={employee ? true : false}
                    />
                    {touched.employeePassword && errors.employeePassword ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.employeePassword}
                      </div>
                    ) : null}
                  </div>
                  <div >
                    <Select
                    value={values?.premission}
                     onChange={handleChange} />

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
                      {isSubmitting ? "inProccess..." : employee ? "Edit Employee" : "Add Employee"}
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