import React from "react";

function Select({onChange: handleChange, value}) {
  
  return (
    <div className="flex flex-col">
      <label  htmlFor="premission">
      Premission
      </label>
      <div
      >
        <select
        value={value}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         name="premission"  onChange={handleChange} >
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>
      </div>
    </div>
  );
}

export default Select;
