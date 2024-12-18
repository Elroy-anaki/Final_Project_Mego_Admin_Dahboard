import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifySuccess , notifyError } from "../../../lib/Toasts/Toasts";
import {useNavigate} from "react-router-dom"

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

function ProfileSection({ employee }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [employeeValues, setValues] = useState(initialValues);

  useEffect(() => {
    if (employee) {
      setValues({
        employeeName: employee.employeeName,
        employeeEmail: employee.employeeEmail,
        employeePassword: "***********",
        premission: employee.premission,
      });
    } else {
      setValues(initialValues);
    }
    console.log("values", employeeValues);
  }, [employee]);

  const { mutate: EditProfile } = useMutation({
    mutationKey: ["EditProfile"],
    mutationFn: async (employeeDetails) => await axios.put(`/employees/edit-employee-by-id/${employee._id}`, employeeDetails),
    
    onSuccess: async (data) => {
      console.log(data);
      await queryClient.invalidateQueries({ queryKey: ["getAllemployees"] });
      notifySuccess(`The change was successful${data.data.msg}`)
      navigate('/dashboard/users')
    },
    onError: (error) => {
      console.log(error)
      notifyError( error.message)
    }
  })
      



  return (
    <div className="flex justify-center items-center w-full h-screen">
        <div className="max-md:order-1 flex flex-col justify-center items-center space-y-16 max-md:mt-16  bg-gradient-to-r from-sky-950 to-sky-800 lg:px-8 px-4 py-4 w-50 ">
          <Formik
            initialValues={employeeValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values, actions) => {
              console.log(values);
              alert("yes");
              EditProfile(values);
              actions.resetForm();
              document.getElementById("addEmployeeModal").close();
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
            }) => (
              <div className=" bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white  overflow-hidden">
                  <div className="p-4">
                    <div className="max-w-md mx-auto">
                      <h1 className="text-2xl font-bold mb-8 text-gray-800">
                        {employee.employeeName} do you want to change ?
                      </h1>
                      <Form id="addEmployeeForm" className="space-y-4">
                        <div>
                          <label
                            className="block text-gray-700 "
                            htmlFor="name"
                          >
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
                          <label
                            className="block text-gray-700 "
                            htmlFor="Email"
                          >
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
                          
                          />
                          {touched.employeeEmail && errors.employeeEmail ? (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.employeeEmail}
                            </div>
                          ) : null}
                        </div>
                        <div className="!mt-12">
                          <button
                            type="submit"
                            className="w-full py-3 px-4 tracking-wider text-lg rounded-md text-white font-semibold  bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 hover:bg-gray-800 focus:outline-none"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "inProccess..." : "change"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
        </div>
     
  );
}

export default ProfileSection;
