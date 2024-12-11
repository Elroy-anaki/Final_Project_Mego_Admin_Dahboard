import React from 'react'
import MealTable from './MealTable'
import { AddButton } from '../../common/Buttons/addButtons'


function MealSection() {

  return (
    <div className='w-[75%]'>
      <div>
        <h1 className='text-5xl text-slate-600 text-center mx-auto mt-5'>Meals</h1>
      </div>
      <div className='mt-20'>
        <MealTable />
      </div>
      <div
        onClick={() => document.getElementById('mealModal').showModal()}
        className='mt-7'>
        <AddButton
          text='Add Meal +' />
      </div>
    </div>
  )
};

export default MealSection
