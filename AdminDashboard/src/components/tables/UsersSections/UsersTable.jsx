import React, { useState } from 'react';
import UserRow from './UserRow';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';


const UsersTable = ({users}) => {
  console.log("UUUSSSEEERRRSSSS ", users)


  return (
    <div>
      <div className="w-full border-2 border-sky-800 ">
        
        <table className="w-full text-left ">
          <thead className="rounded-lg bg-sky-800 text-center">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-white">Name</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Email</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Active Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users && users.map((user) => <UserRow key={user._id} User={user} />)}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UsersTable;