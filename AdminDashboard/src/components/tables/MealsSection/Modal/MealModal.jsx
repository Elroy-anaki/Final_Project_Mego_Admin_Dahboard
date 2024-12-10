import React, {useContext} from 'react'
import MealModalForm from './MealModalForm'
import { MealContext } from '../../../../Contexts/MealContext'


function MealModal() {
    const { meal, setMeal } = useContext(MealContext);

    return (

        <dialog id="mealModal" className="modal w-[30%] px-10 py-5 bg-white rounded-xl border-2 border-sky-500">
            
            <div className="modal-box">
                <div className='flex justify-between mb-6'>
                <h2 className='text-3xl text-gray-800 '>New Meal</h2>
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
