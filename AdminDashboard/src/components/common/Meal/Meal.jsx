import React from 'react';

function Meal({ meal,  setState }) {

    
    return (
        <div className="flex flex-col items-center justify-between bg-gray-200 p-4 rounded-lg w-36 h-56 shadow-md  hover:bg-gray-300 transition duration-300">
            {/* Left Side: Image and Name */}
            <div className="flex items-center gap-4">
                <img 
                    src={meal.meal.mealImage} 
                    alt={meal.mealName} 
                    loading="lazy" 
                    className="w-16 h-16 object-cover rounded-md border border-gray-300" 
                />
            </div>
                <p className="text-lg font-semibold text-gray-700 text-center">{meal.meal.mealName}</p>

            {/* Right Side: Quantity Input */}
            <div>
                <input 
                    type="number" 
                    value={meal.quantity} 
                    className="border border-gray-300 rounded-lg p-2 w-20 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onChange={() => setState(true)}
                />
            </div>
        </div>
    );
}

export default Meal;
