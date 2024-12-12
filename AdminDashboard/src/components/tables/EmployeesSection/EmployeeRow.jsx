import React, { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios';
import { notifySuccess } from '../../../lib/Toasts/Toasts';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';


function EmployeeRow({ Employee }) {
    const queryClient = useQueryClient()
    const {employee, setEmployee} = useContext(EmployeeContext)

    const {mutate: deleteEmployee} = useMutation({
        mutationKey:['deleteEmployeeById'],
        mutationFn: async () => {
            try {
                const { data } = await axios.delete(`/employees/delete-employee-by-id/${Employee._id}`)
                console.log(data)
                return data
            } catch (error) {
                throw error
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['getAllemployees']});
            console.log(data.msg)
            notifySuccess(data.msg)
        }
    })





    return (
        <tr key={Employee._id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{Employee.employeeName}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{Employee.employeeEmail}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{Employee.premission}</td>
            <td className="px-6 py-4 text-sm text-center ">
                <div className="inline-flex gap-3">
                    <button
                    onClick={() => {
                        setEmployee(Employee)
                        console.log("Employee", Employee)
                        document.getElementById('addEmployeeModal').showModal()}}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                    onClick={deleteEmployee}
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
