import React from 'react';
import MealRow from './MealRow';


const MealTable = ({meals}) => {
      
    return (
        <div>
      <div className="w-full border-2  border-sky-800  ">
        
        <table className="w-full text-left ">
          <thead className="rounded-lg bg-sky-800 text-center">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-white">Name</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Price</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Image</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Reviews</th>
              <th className="px-6 py-1 text-lg font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {meals && meals.map((meal) => <MealRow key={meal._id} Meal={meal} />)}
          </tbody>
        </table>
      </div>

    </div>
    
  )
}

export default MealTable
