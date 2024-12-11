import React, { useState } from 'react';
import EmployeeRow from './EmployeeRow';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const testArray = [{ id: 1, userName: 'John Doe', userEmail: 'john@example.com', userPermission: 'Admin' },
{ id: 2, userName: 'Sarah Smith', userEmail: 'sarah@example.com', userPermission: 'Editor' },
{ id: 3, userName: 'Mike Johnson', userEmail: 'mike@example.com', userPermission: 'User' },
]

const EmployeesTable = () => {

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['getAllemployees'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/employees/get-all-employees');
      return response.data;
    },
  });

  return (
    <div>
      <div className="w-full border-2 border-sky-800 ">
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error}</div>}
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
            {data && data.data.map((employee) => <EmployeeRow key={employee._id} Employee={employee} />)}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EmployeesTable;