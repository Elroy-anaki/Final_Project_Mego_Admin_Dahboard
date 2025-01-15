import React, { useState, useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Category from '../../../common/Category/Category';
import { notifySuccess } from '../../../../lib/Toasts/Toasts';
import { MealContext } from '../../../../Contexts/MealContext'


const initValues = {
    mealName: "",
    mealPrice: 0,
    ingredients: ""
}

function MealModalForm() {
    const { meal, setMeal, setCategories, categories } = useContext(MealContext);
    const queryClient = useQueryClient()
    const [ingredients, setIngredients] = useState("");
    const [values, setValues] = useState(initValues)

    useEffect(() => {
        if (meal) {
            setValues({
                mealName: meal.mealName,
                mealPrice: meal.mealPrice,
                ingredients: meal.ingredients
            });
            setIngredients(meal.ingredients)
        } else setValues(initValues)
    }, [meal]);

    const { data: data } = useQuery({
        queryKey: ['getAllCaterogies'],
        queryFn: async () => {
            const { data } = await axios.get('/categories/get-all-categories')
            console.log(data)
            return data
        },
        staleTime: 1000 * 60
    }
    )

    const { mutate: addOrEditMeal } = useMutation({
        mutationKey: ['addOEditMeal'],
        mutationFn: async (mealDetails) => {
            const { data } = await axios({
                method: meal ? "PUT" : "POST",
                data: mealDetails,
                url: meal ? `/meals/edit-meal-by-id/${meal._id}` : "/meals/add-meal"
            })
            return data
        },
        onSuccess: async (data) => {
            console.log("THIS", data)
            queryClient.invalidateQueries({ queryKey: ['getAllMeals'] })
            notifySuccess(data.msg)
        },
        onError: async (data) => {
            alert(data.msg)
        }
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value, });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        const mealDetails = new FormData(e.currentTarget);
        mealDetails.set('ingredients', ingredients);
        mealDetails.set('mealCategories', JSON.stringify(categories.map((category) => category._id)))
        addOrEditMeal(mealDetails)
        document.getElementById('mealModal').close()
        document.getElementById("mealModalForm").reset();
    };

    return (
        <div>
            <form
                id='mealModalForm'
                onSubmit={handelSubmit}
                className='space-y-4' >
                <div className='space-y-1'>
                    <label htmlFor="mealName">Name</label>
                    <input
                        id="mealName"
                        name="mealName"
                        type="text"
                        required
                        className="text-gray-800  border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        placeholder="Enter name..."
                        onChange={handelChange}
                        value={values?.mealName}
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="mealPrice">Price</label>
                    <input
                        id="mealPrice"
                        name="mealPrice"
                        type="number"
                        required
                        placeholder='0'
                        className="text-gray-800  border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        onChange={handelChange}
                        value={values?.mealPrice}
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="ingredients">Ingredients</label>
                    <input
                        id="ingredients"
                        name="ingredients"
                        type="text"
                        required
                        onBlur={(e) => { setIngredients(e.target.value) }}
                        className="text-gray-800  border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        placeholder="example, example, ... "
                        onChange={handelChange}
                        value={values?.ingredients}
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="mealImage">Image</label>
                    <input
                        id="mealImage"
                        name="mealImage"
                        type="file"
                        className="text-gray-800  border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="mealCategory">Choose Category</label>
                    <select
                        onChange={(e) => setCategories((categories) => {
                            const newOption = {
                                _id: e.target.value,
                                categoryName: e.target.options[e.target.selectedIndex].text
                            }
                            const isExist = categories.some((category) => category._id === newOption._id)
                            console.log(isExist)
                            return isExist ? categories : [...categories, newOption]
                        })}
                        className="text-gray-800 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        name="mealCategory"
                        id="mealCategory"
                    >
                        {data && data?.data.map((category) => <option value={category._id}>{category.categoryName}</option>)}
                    </select>
                    <div
                        className='flex flex-wrap justify-start gap-2 py-3'
                    >{categories?.map((cat) =>
                        <div
                            className='bg-sky-200 rounded-md cursor-pointer'
                            onClick={() => setCategories((prevData) => {
                                return prevData.filter((category) => category._id !== cat._id);
                            })} >
                            <Category
                                value={cat.categoryName}
                            />

                        </div>)}
                    </div>
                </div>
                <div
                    className='bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 hover:bg-gray-800 text-xl text-white px-6 py-2 text-center w-full rounded-lg cursor-pointer'>
                    <button
                        type="submit">{meal ? "Edit Meal" : "Add Meal"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MealModalForm
