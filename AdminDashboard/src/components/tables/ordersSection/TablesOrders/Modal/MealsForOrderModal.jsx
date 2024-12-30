import React, { useContext, useEffect, useState } from 'react';
import { MealsForOrderContext } from '../../../../../Contexts/MealsForOrderContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Meal from '../../../../common/Meal/Meal';

function MealsForOrderModal() {
    const { mealsForOrder, setMealsForOrder } = useContext(MealsForOrderContext);
    const [change, setChange] = useState(false)
    const [categories, setCategories] = useState(null)
    const [meals, setMeals] = useState(null)
    const [chosenCategory, setChosenCategory] = useState(null)

    const { mutate: getAllMeals } = useMutation({
        mutationKey: ['getAllMeals'],
        mutationFn: async () => {
            const { data } = await axios.get(`/meals/get-all-meals`);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
    });
    const { mutate: getCategories } = useMutation({
        mutationFn: async () => await axios.get('/categories/get-all-categories'),
        onSuccess: (data) => {
            console.log(data.data.data)
            setCategories(data.data.data)
            return data.data.data

        }
    })
    const { mutate: getMealsByCategory } = useMutation({
        mutationKey: ['getMealsByCategory'],
        mutationFn: async () => await axios.get(`/meals/get-meals-by-category/${chosenCategory}`),
        onSuccess: (data) => {
            console.log(data.data.data)
            setMeals(data.data.data)

        }
    })



    return (
        <div>
            {/* Open Modal Button */}
            <button
                className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => document.getElementById('mealsForOrderModal').showModal()}
            >
                Open Modal
            </button>

            {/* Modal */}
            <dialog id="mealsForOrderModal" className="modal w-[50%]">
                <div className="modal-box w-11/12 mx-auto max-w-5xl">
                    {/* Modal Header */}
                    <h3 className="font-bold text-2xl text-center mb-6 text-gray-800">Client Table</h3>

                    {/* Modal Content */}
                    <div className="py-4 px-2 flex flex-col">


                        {/* List of Meals */}
                        <div className="space-y-1 flex flex-wrap justify-start items-center gap-3">
                            {mealsForOrder?.length ? (
                                mealsForOrder.map((meal, index) => (
                                    <Meal key={index} meal={meal} setState={setChange} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No meals available.</p>
                            )}
                        </div>
                        {change && <button
                            onClick={() => alert("Save")}
                            className="my-2 bg-blue-500 w-36 text-white px-4 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-6"
                        >
                            Save
                        </button>}
                        <button
                            onClick={() => getCategories()}
                            className="my-2 w-36 bg-green-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-6"
                        >
                            Add Meal
                        </button>
                        <div className='flex justify-start gap-5'>

                        {categories && (
                            <select
                                className="bg-gray-100 w-36 px-3 py-2 rounded-lg"
                                onChange={(e) => {
                                    const selectedCategoryId = e.target.value;
                                    setChosenCategory(selectedCategoryId); 
                                    getMealsByCategory(); 
                                }}
                            >
                                <option value="" disabled selected>
                                    Category
                                </option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}
                        {meals && <select
                                className="bg-gray-100 w-36 px-3 py-2 rounded-lg"
                                onChange={(e) => {
                                    const selectMeal = e.target.value;
                                    console.log("selectMeal", selectMeal); 
                                }}
                               
                            >
                                <option value="" disabled selected>
                                    Meal
                                </option>
                                {meals?.map((meal) => (
                                    <option key={meal._id} value={meal._id}>
                                        {meal.mealName}
                                    </option>
                                ))}
                            </select>}
                            </div>

                    </div>

                    {/* Modal Footer */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button 
                            onClick={() => {
                                setCategories(null);
                                setMeals(null);
                                setChosenCategory(null)

                                
                            }}
                            className="btn bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default MealsForOrderModal;

// TODO How I get and set the tableOrder meals
