import React from "react";

function Select({onChange: handleChange, value}) {
  
  return (
    <div className="flex flex-col pt-3">
      <label  htmlFor="premission">
      Premission
      </label>
      <div
      >
        <select
        value={value}
        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         name="premission"  onChange={handleChange} >
        <option value="admin">admin</option>
        <option value="employee">employee</option>
      </select>
      </div>
    </div>
  );
}

export default Select;
