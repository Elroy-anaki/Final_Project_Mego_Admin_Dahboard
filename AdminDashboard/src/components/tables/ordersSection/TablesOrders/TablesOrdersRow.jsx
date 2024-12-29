import React, { useContext } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { FaEye } from "react-icons/fa6";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifySuccess } from '../../../../lib/Toasts/Toasts';
import { MealsForOrderContext } from '../../../../Contexts/MealsForOrderContext';


function TablesOrdersRow({ orderTable }) {

    const { setMealsForOrder} = useContext(MealsForOrderContext)
    console.log(orderTable)
    const queryclient = useQueryClient()

    const { mutate: changeStatus } = useMutation({
        mutationKey: ['changeStatus'],
        mutationFn: async (newStatus) => await axios.put(`orders/change-status/${orderTable._id}`, newStatus),
        onSuccess: (data) => {
            console.log(data);
            notifySuccess(data.data.msg)
            queryclient.invalidateQueries({ queryKey: ['getAllTablesOrders'] });

        },
        onError: (error) => console.log(error)
    })




    return (
        <tr className="hover:bg-sky-100 ">
            <td className="px-6 py-4 text-md font-semibold text-gray-900 text-center">#{String(orderTable._id).slice(0, 7)}</td>
            <td className="px-6 py-4 text-md text-gray-900 text-center">{orderTable.user.userName}</td>
            <td className="px-6 py-4 text-md text-gray-900 text-center ">{orderTable.numberOfGuests}</td>
            <td className="px-6 py-4 text-sm text-center"
                onClick={() => {document.getElementById('mealsForOrderModal').showModal()
                    console.log(orderTable.table.meals)
                    setMealsForOrder(orderTable.table.meals)
                }}>
                ll</td>
            <td className="px-6 py-4 text-lg font-semibold text-gray-900 text-center ">{orderTable?.table?.totalPrice || 0}$</td>
            <td className="px-6 py-4 text-md text-center flex flex-col gap-1 font-semibold">
                <div>{orderTable.dateTime.date}</div>
                <div className='text-sm'>{orderTable.dateTime.time}</div></td>
            <td className="px-6 py-4 text-sm text-center">
                <select
                    onChange={(e) => changeStatus({ newStatus: e.target.value, type: 'orderTable' })}
                    value={orderTable.status}
                    className={`border border-gray-300 rounded-md px-4 py-2 
            ${orderTable.status === 'pending' ? 'bg-purple-400' : ''}
            ${orderTable.status === 'eating' ? 'bg-green-400' : ''}
            ${orderTable.status === 'paid' ? 'bg-rose-600 ' : ''}`}
                >
                    <option value="pending" className='bg-purple-400 px-4 py-2'>Pending</option>
                    <option value="eating" className='bg-green-400 px-4 py-2'>Eating</option>
                    <option value="paid" className='bg-rose-600 px-4 py-2'>Paid</option>
                </select>
            </td>

        </tr>
    );
}

export default TablesOrdersRow
