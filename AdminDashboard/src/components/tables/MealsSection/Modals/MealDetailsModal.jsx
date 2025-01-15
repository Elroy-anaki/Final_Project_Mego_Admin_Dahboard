import React, { useContext } from 'react'
import { MealContext } from '../../../../Contexts/MealContext'
import { IoCloseCircle } from "react-icons/io5";
import { Star, Clock, MessageCircle } from 'lucide-react';
import { AddButton } from '../../../common/Buttons/addButtons';



function MealDetailsModal() {
  const { meal ,setMeal } = useContext(MealContext)

  return (
    <div>
        <dialog
            id="mealDetails"
            className="modal bg-white shadow-2xl rounded-lg overflow-hidden  w-[90%] max-w-4xl max-h-[90vh] mx-auto border-2 border-gray-400/50"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div className="absolute top-0 right-0">
                        <button
                            onClick={() => {
                                document.getElementById('mealDetails').close();
                                setMeal(null)
                            }}
                            className="bg-rose-500/90 backdrop-blur-sm  w-4 h-4  rounded-lg shadow-lg hover:bg-rose-400 transition-colors duration-200"
                        >
                        </button>
                    </div>
                {/* Image Section */}
                <div className="relative group">
                  
                    <img
                        className="w-full h-[550px] rounded-xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                        src={meal?.mealImage}
                        alt={meal?.mealName}
                    />
                    <div className="mt-6">
                        
                    </div>
                    
                </div>

                {/* Content Section */}
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        {/* Header */}
                        <div className="mb-2">
                            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                                {meal?.mealName}
                            </h1>
                            <div className="flex  gap-2 flex-wrap flex-col justify-start items-start">
                                <span className="text-2xl font-bold text-amber-600">
                                    <span className='text-3xl text-black font-medium mr-2'>Price:</span>

                                    ${meal?.mealPrice}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className='text-lg text-black font-medium'>Rating:</span>
                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                    <span className="font-semibold">
                                        {Number(meal?.rating?.avgOfRating).toFixed(1)}
                                        <span className='ml-2 text-xs'>(Rated {meal?.reviews?.length})</span>
                                    </span>
                                </div>
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition-colors"
                                >
                                    <span className='text-lg text-black font-medium'>Calories:</span>
                                    <Clock className="w-5 h-5" />
                                    <span className="font-semibold">{meal?.amoutnOfCalories} cal</span>
                                </div>

                            </div>
                        </div>


                        {/* Ingredients */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Ingredients
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {meal?.ingredients?.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-4 py-2 rounded-full shadow-sm text-sm font-medium hover:shadow-md transition-shadow duration-200"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-gray-100 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageCircle className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Reviews
                                </h2>
                            </div>
                            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                                {meal?.reviews?.map((review, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-800">
                                                {review?.user?.name}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                <span className="font-medium text-amber-600">
                                                    {review.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}

                </div>
            </div>
        </dialog>
    </div>
);
}

export default MealDetailsModal
