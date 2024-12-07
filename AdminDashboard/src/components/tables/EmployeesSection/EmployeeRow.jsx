import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';


function EmployeeRow({ id, employeeName, employeeEmail, premission }) {
    return (
        <tr key={id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{employeeName}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{employeeEmail}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{premission}</td>
            <td className="px-6 py-4 text-sm text-center ">
                <div className="inline-flex gap-3">
                    <button
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default EmployeeRow
