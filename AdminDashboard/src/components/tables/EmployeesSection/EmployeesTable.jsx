import React, { useState } from 'react';
import EmployeeRow from './EmployeeRow';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';


const EmployeesTable = ({employees}) => {
  console.log("EMPLOYEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ", employees)


  return (
    <div>
      <div className="w-full border-2 border-sky-800 ">
        
        <table className="w-full text-left ">
          <thead className="rounded-lg bg-sky-800 text-center">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-white">Name</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Email</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Permission</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees && employees.map((employee) => <EmployeeRow key={employee._id} Employee={employee} />)}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EmployeesTable;