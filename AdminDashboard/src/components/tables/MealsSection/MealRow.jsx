import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { FaEye } from "react-icons/fa6";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifySuccess } from '../../../lib/Toasts/Toasts';


function MealRow({ _id, mealName, mealPrice, mealImage, ingredients, reviews }) {

    const queryClient = useQueryClient()

    const { mutate: deleteMeal } = useMutation({
        mutationKey: ['deleteMealById'],
        mutationFn: async (_id) => {
            const { data } = await axios.delete(`/meals/delete-meal-by-id/${_id}`);
            console.log("M",data.msg);
            return data;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['getAllMeals'] })
            console.log("os",data);
            console.log(data.msg)
            alert("End  ")

        },
        onError: (data) => { console.log(data)}
    })

    const {mutate:getReviewsByMealId} = useMutation({
        mutationKey:['getReviewsByMealId'],
        mutationFn: async (_id) => {
            const { data } = await axios.get(`http://localhost:3000/meals/get-all-reviews-by-id/${_id}`)
            console.log(data);
        }

    })

    return (
        <tr key={_id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-md font-semibold text-gray-900 text-center">{mealName}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{mealPrice}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center flex justify-center">
                <img src={mealImage} alt={mealName} className='w-12 h-12 rounded-xl' />

            </td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">-----</td>
            <td className="px-6 py-4 text-sm text-center ">
                <div className="inline-flex gap-3">
                    <button
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => deleteMeal(_id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                    onClick={()=> {
                        alert("get")
                        getReviewsByMealId(_id)}}
                        className="text-purple-600 hover:text-purple-800"
                    >
                        <FaEye className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default MealRow
