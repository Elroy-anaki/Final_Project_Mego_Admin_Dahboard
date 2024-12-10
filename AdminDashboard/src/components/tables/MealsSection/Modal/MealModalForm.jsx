import React, { useState, useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Category from '../../../common/Category/Category';
import { notifySuccess } from '../../../../lib/Toasts/Toasts';
import { MealContext } from '../../../../Contexts/MealContext'



function MealModalForm() {
    const { meal } = useContext(MealContext);

    const [ingredients, setIngredients] = useState("");
    const [categories, setCategories] = useState([]); // TODO meal ? meal.mealCategory : []
    const [values, setValues] = useState({
        mealName: "",
        mealPrice: 0,
        ingredients: ""
    })
    
    useEffect(() => {
        if (meal) {
            setValues({
                mealName: meal.mealName || "",
                mealPrice: meal.mealPrice || 0,
                ingredients: meal.ingredients || ""
            });
        }
    }, [meal]);

    // useEffect(() => {
    //     meal && setCategories(meal.mealCategory)
    // })
    
    const queryClient = useQueryClient()

    const { data: data } = useQuery({
        queryKey: ['getAllCaterogies'],
        queryFn: async () => {
            const { data } = await axios.get('/meals-categories/get-all-meal-categories')
            console.log(data)
            return data
        },
        staleTime: 1000 * 60
    }
    )

    const { mutate: addMeal } = useMutation({
        mutationKey: ['addNewMeal'],
        mutationFn: async (meal) => {
            console.log("Work");
            const { data } = await axios.post('/meals/add-meal', meal, { withCredentials: true })
            console.log(data)
            return data
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['getAllMeals'] })
            notifySuccess(data.msg)
        },
        onError: async (data) => {
            alert(data.msg)
        }
    });

    const handelChangeCategories = (e) => setCategories((prevData) => {
        const newOption = {
            _id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }
        const isExist = prevData.some((category) => category._id === newOption._id)
        console.log(isExist)
        return isExist ? prevData : [...prevData, newOption]
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value, });
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        const mealDetails = new FormData(e.currentTarget);
        mealDetails.set('ingredients', ingredients);
        mealDetails.set('mealCategory', JSON.stringify(categories.map((category) => category._id)))
        addMeal(mealDetails)
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
                        className="text-gray-800 bg-gray-100 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        placeholder="Enter name..."
                        onChange={handelChange}
                        value={meal? meal?.mealName : ""}
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
                        className="text-gray-800 bg-gray-100 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        onChange={handelChange}
                        value={meal? meal?.mealPrice : 0}
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
                        className="text-gray-800 bg-gray-100 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        placeholder="example, example, ... "
                        onChange={handelChange}
                        value={meal ? JSON.stringify(meal?.ingredients) : ""}
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="mealImage">Image</label>
                    <input
                        id="mealImage"
                        name="mealImage"
                        type="file"
                        className="text-gray-800 bg-gray-100 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="mealCategory">Choose Category</label>
                    <select
                        onChange={handelChangeCategories}
                        className="text-gray-800 bg-gray-100 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        name="mealCategory"
                        id="mealCategory"
                    >
                        {data && data?.data.map((category) => <option value={category._id}>{category.mealCategoriesName}</option>)}
                    </select>
                    <div
                        className='flex flex-wrap justify-start gap-2 py-3'
                    >{categories.map((cat) =>
                        <div
                            className='bg-sky-200 rounded-md cursor-pointer'
                            onClick={() => setCategories((prevData) => {
                                return prevData.filter((category) => category._id !== cat._id);
                            })} >
                            <Category
                                value={cat.name}
                            />

                        </div>)}
                    </div>
                </div>
                <div
                    className='bg-sky-600 text-xl px-6 py-2 text-center w-full mb-5 rounded-lg cursor-pointer'>
                    <button
                        type="submit">Add Meal
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MealModalForm
