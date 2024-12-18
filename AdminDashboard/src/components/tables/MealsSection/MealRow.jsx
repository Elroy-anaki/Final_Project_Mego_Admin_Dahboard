import React, { useContext } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { FaEye } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MealContext } from '../../../Contexts/MealContext'
import { notifySuccess } from '../../../lib/Toasts/Toasts';
import { FaArrowUp } from "react-icons/fa";



function MealRow( {Meal} ) {
    const { setMeal } = useContext(MealContext);

    const queryClient = useQueryClient();

    const { mutate: deleteMeal } = useMutation({
        mutationKey: ['deleteMealById'],
        mutationFn: async () => {
            const { data } = await axios.delete(`/meals/delete-meal-by-id/${Meal._id}`);
            console.log("M", data);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getAllMeals'] });
            notifySuccess("Meal Deleted Successfully")
        },
        onError: (data) => { console.log(data) }
    });

    return (
        <tr key={Meal._id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-md font-semibold text-gray-900 text-center">{Meal.mealName}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{Meal.mealPrice}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center flex justify-center">
                <img src={Meal.mealImage} alt={Meal.mealName} className="w-12 h-12 rounded-xl" />
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">-----</td>
            <td className="px-6 py-4 text-sm text-center">
                <div className="inline-flex gap-3">
                    <button
                        onClick={() => {
                            setMeal(Meal);
                            document.getElementById('mealModal').showModal();
                        }}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => deleteMeal()}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={ ()=> {
                            
                            setMeal(Meal);
                            document.getElementById('mealDatails').showModal()
                        }}
                        className="text-purple-600 hover:text-purple-800"
                    >
                        <FaEye className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default MealRow;

