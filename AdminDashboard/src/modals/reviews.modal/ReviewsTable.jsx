import React from 'react'

function ReviewsTable({meal}) {
    
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">{meal?.mealName}</h2>
      <img 
        src={meal?.mealImage}
        alt={meal?.mealName} 
        className="w-48 h-48 mx-auto object-cover rounded-lg mb-6"
      />
    </div>
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-right border border-gray-200">#</th>
              <th className="p-4 text-right border border-gray-200">Username</th>
              <th className="p-4 text-right border border-gray-200">Rating</th>
              <th className="p-4 text-right border border-gray-200">Comment</th>
            </tr>
          </thead>
          <tbody>
            {meal?.reviews?.map((review, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 text-right border border-gray-200 text-xs text-gray-500">{index + 1}</td>
                <td className="p-4 text-right border border-gray-200">{review?.user?.name}</td>
                <td className="p-4 text-right border border-gray-200">{review?.rating} ⭐</td>
                <td className="p-4 text-right border border-gray-200">{review?.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>


  )
}

export default ReviewsTable
