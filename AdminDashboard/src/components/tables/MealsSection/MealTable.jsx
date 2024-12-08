import React from 'react';
import { AddButton } from '../../common/Buttons/addButtons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MealRow from './MealRow';


const MealTable = () => {

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllMeals'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3000/meals/get-all-meals')
            return data;
        },
    })
    return (
        <div>
      <div className="w-full border-2 border-sky-800 ">
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error}</div>}
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
            {data && data.data.map((meal) => <MealRow key={meal._id} {...meal} />)}
          </tbody>
        </table>
      </div>

    </div>
    
  )
}

export default MealTable
