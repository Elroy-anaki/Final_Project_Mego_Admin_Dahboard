import React, { useContext } from 'react';
import { Pencil, Trash2, Mail, UserCircle2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifySuccess } from '../../../lib/Toasts/Toasts';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';

function EmployeeRow({ Employee }) {
    const queryClient = useQueryClient();
    const { setEmployee } = useContext(EmployeeContext);

    const { mutate: deleteEmployee } = useMutation({
        mutationKey: ['deleteEmployeeById'],
        mutationFn: async () => {
            const { data } = await axios.delete(`/employees/delete-employee-by-id/${Employee._id}`);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getAllemployees'] });
            notifySuccess(data.msg);
        }
    });

    return (
        <tr className="group transition-all duration-200 hover:bg-blue-50/30 border-b border-gray-100">
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{Employee.employeeName}</div>
                    </div>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">{Employee.employeeEmail}</div>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <span className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    transition-colors duration-200
                    ${Employee.premission === 'admin' 
                        ? 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200' 
                        : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'}
                `}>
                    <span className={`
                        w-1.5 h-1.5 rounded-full
                        ${Employee.premission === 'admin' 
                            ? 'bg-indigo-500' 
                            : 'bg-emerald-500'}
                    `}></span>
                    {Employee.premission}
                </span>
            </td>
            
            <td className="py-4 px-6">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => window.location.href = `mailto:${Employee.employeeEmail}`}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        title="Send Email"
                    >
                        <Mail className="w-4 h-4" />
                    </button>
                    
                    <button
                        onClick={() => {
                            setEmployee(Employee);
                            document.getElementById('addEmployeeModal').showModal();
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
                        title="Edit Employee"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    
                    <button
                        onClick={deleteEmployee}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                        title="Delete Employee"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EmployeeRow;