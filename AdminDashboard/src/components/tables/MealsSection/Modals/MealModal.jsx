import React, {useContext} from 'react'
import MealModalForm from './MealModalForm'
import { MealContext } from '../../../../Contexts/MealContext'


function MealModal() {
    const { meal, setMeal } = useContext(MealContext);

    return (

        <dialog id="mealModal" className="modal w-[40%] px-10 py-10 bg-white rounded-xl ">
            
            <div className="modal-box">
                <div className='flex justify-between mb-6'>
                <h2 className='text-3xl text-gray-800 '>{meal ? "Edit Meal" :"New Meal" }</h2>
                    <button 
                    onClick={()=>{
                        setMeal(null)
                        document.getElementById('mealModalForm').reset()
                        document.getElementById('mealModal').close()
                    }}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                </div>
                    <MealModalForm/>
            </div>
        </dialog>

    )
}

export default MealModal
