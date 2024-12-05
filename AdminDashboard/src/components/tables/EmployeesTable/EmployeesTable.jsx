import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const UsersTable = () => {
  // Sample data - in reality this would likely come from props or an API
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', permission: 'Admin' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', permission: 'Editor' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', permission: 'User' },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (id) => {
    // Add edit logic here
    console.log('Editing user:', id);
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      <table className="w-full text-left bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Email</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Permission</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.permission}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;