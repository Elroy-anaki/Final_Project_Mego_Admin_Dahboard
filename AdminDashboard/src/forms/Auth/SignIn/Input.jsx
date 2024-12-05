import { ErrorMessage } from "formik";
import React from "react";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.name} className="text-gray-800 text-sm mb-2 block">
        {String(props.label)}
      </label>
      <div className="relative flex items-center">
        <input
          name={props.name}
          type={props.type}
          required
          className={`text-gray-800 bg-white border ${!props.error ?"border-gray-300" :"border-red-500"}  border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
      <ErrorMessage name={props.name}>{msg => <div className="mt-2 text-base text-red-700">{msg}</div>}</ErrorMessage>

    </div>
  );
}

export default Input;
