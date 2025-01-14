import React, { useContext } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { FaEye } from "react-icons/fa6";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifySuccess } from '../../../../lib/Toasts/Toasts';
import { MealsForOrderContext } from '../../../../Contexts/MealsForOrderContext';


function TablesOrdersRow({ orderTable }) {


    const { setMealsForOrder } = useContext(MealsForOrderContext)

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
            <td className="px-6 py-4 text-md font-semibold text-gray-900 text-center">#{String(orderTable._id).slice(0, 4)}</td>
            <td className="px-6 py-4 text-md text-gray-900 text-center">{orderTable.user.userName}</td>
            <td className="px-6 py-4 text-md text-gray-900 text-center ">{orderTable.numberOfGuests}</td>
            <td className="px-6 py-4 text-md text-center cursor-pointer"
                onClick={() => {
                    document.getElementById('mealsForOrderModal').showModal()
                    console.log(orderTable.table.meals)
                    setMealsForOrder(orderTable.table.meals)
                }}>
                Meals <span className='text-xs'>({orderTable.table.meals.length})</span></td>
            <td className="px-6 py-4 text-lg font-semibold text-gray-900 text-center ">{orderTable?.table?.totalPrice || 0}$</td>
            <td className="px-6 py-4 text-md text-center flex flex-col gap-1 font-semibold">
                <div>{orderTable.dateTime.date}</div>
                <div className='text-sm'>{orderTable.dateTime.time}</div></td>
            <td className="px-6 py-4 text-sm text-center">
                <select
                    onChange={(e) => changeStatus({ newStatus: e.target.value, type: 'orderTable' })}
                    value={orderTable.status}
                    className={`border border-gray-300 rounded-md px-4 py-2 
            ${orderTable.status === 'paid' ? 'bg-purple-400' : ''}
            ${orderTable.status === 'eating' ? 'bg-green-400' : ''}
            ${orderTable.status === 'completed' ? 'bg-rose-400 ' : ''}
            ${orderTable.status === 'canceled' ? 'bg-rose-800 ' : ''}
            `
        }
                >
                    <option value="paid" className='bg-purple-400 px-4 py-2'>Paid</option>
                    <option value="eating" className='bg-green-400 px-4 py-2'>Eating</option>
                    <option value="completed" className='bg-rose-400 px-4 py-2'>Completed</option>
                    <option value="canceled" className='bg-rose-800 px-4 py-2'>Canceled</option>
                </select>
            </td>

        </tr>
    );
}

export default TablesOrdersRow
