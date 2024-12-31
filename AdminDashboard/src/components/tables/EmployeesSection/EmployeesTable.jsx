import React from 'react';
import EmployeeRow from './EmployeeRow';

const EmployeesTable = ({ employees }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th scope="col" className="group px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    Name
                  </span>
                  <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </th>
              <th scope="col" className="group px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    Email
                  </span>
                  <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </th>
              <th scope="col" className="group px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    Permission
                  </span>
                  <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </th>
              <th scope="col" className="group px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    Actions
                  </span>
                  <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {employees?.map((employee) => (
              <EmployeeRow key={employee._id} Employee={employee} />
            ))}
          </tbody>

          {/* Table Footer - Optional stats or summary */}
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="4" className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  Total Employees: {employees?.length || 0}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Empty State */}
      {(!employees || employees.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-sm">No employees found</div>
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;